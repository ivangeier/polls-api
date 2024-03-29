import { z } from "zod"
import { prisma } from "../../lib/prisma"
import { FastifyInstance } from "fastify"
import { randomUUID } from "crypto"
import { redis } from "../../lib/redis";
import { voting } from "../../utils/voting-pub-sub";

export async function voteOnPoll(app: FastifyInstance) {
  app.post('/polls/:pollId/votes', async (request, reply) => {
    const voteOnPoll = z.object({
      pollOptionId: z.string().uuid()
    })

    const voteOnPollParams = z.object({
      pollId: z.string().uuid()
    })

    const { pollOptionId } = voteOnPoll.parse(request.body)
    const { pollId } = voteOnPollParams.parse(request.params)

    let { sessionId } = request.cookies

    if (sessionId) {
      const userAlreadyVotedOnPoll = await prisma.vote.findUnique({
        where: {
          sessionId_pollId: {
            sessionId,
            pollId
          }
        }
      })

      if (userAlreadyVotedOnPoll && userAlreadyVotedOnPoll.pollOptionId !== pollOptionId) {
        //remove previous vote
        await prisma.vote.delete({
          where: {
            id: userAlreadyVotedOnPoll.id
          }
        })
        //decrement previous vote
        const votes = await redis.zincrby(pollId, -1, userAlreadyVotedOnPoll.pollOptionId)

        voting.publish(pollId, { pollOptionId: userAlreadyVotedOnPoll.pollOptionId, votes: Number(votes) })


      } else if (userAlreadyVotedOnPoll) {
        return reply.status(400).send({
          message: 'You already voted on this poll'
        })
      }
    }

    if (!sessionId) {
      sessionId = randomUUID()

      //* using cookie to prevent multiple votes - study case only
      reply.setCookie('sessionId', sessionId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 30, // 30 days
        signed: true,
        httpOnly: true,
      })

    }

    await prisma.vote.create({
      data: {
        sessionId,
        pollId,
        pollOptionId
      }
    })

    const votes = await redis.zincrby(pollId, 1, pollOptionId)

    voting.publish(pollId, { pollOptionId, votes: Number(votes) })

    return reply.status(201).send()
  })
}