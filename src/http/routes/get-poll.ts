import { z } from "zod"
import { prisma } from "../../lib/prisma"
import { FastifyInstance } from "fastify"
import { redis } from "../../lib/redis"

export async function getPoll(app: FastifyInstance) {
  app.get('/polls/:pollId', async (request, reply) => {
    const getPollParams = z.object({
      pollId: z.string().uuid()
    })

    //validate and parse request params
    const { pollId } = getPollParams.parse(request.params)

    //get poll by id including options
    const poll = await prisma.poll.findUnique({
      where: {
        id: pollId
      },
      include: {
        options: {
          select: {
            id: true,
            title: true
          }
        }
      }
    })

    if (!poll) {
      return reply.status(400).send({ message: 'Poll not found' })
    }

    //get poll votes
    const result = await redis.zrange(pollId, 0, -1, 'WITHSCORES')

    const votes = result.reduce((obj, line, index) => {
      if (index % 2 === 0) {
        const score = result[index + 1]
        obj[line] = Number(score)
      }
      return obj
    }, {} as Record<string, number>)

    return reply.send({
      poll: {
        ...poll,
        options: poll.options.map(option => ({
          ...option,
          votes: votes[option.id] || 0
        }))
      }
    })
  })
}