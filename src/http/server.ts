import fastify from "fastify";
import { PrismaClient } from "@prisma/client";
import { z } from 'zod'
import { createPoll } from "./routes/create-polls";
import { getPoll } from "./routes/get-poll";

const app = fastify()

app.register(createPoll)
app.register(getPoll)

app.listen({ port: 3333 }).then(() => {
  console.log('server listening on port 3333')
})