import fastify from "fastify";
import { createPoll } from "./routes/create-polls";
import { getPoll } from "./routes/get-poll";
import { voteOnPoll } from "./routes/vote-on-poll";
import cookie from "@fastify/cookie";
import websocket from "@fastify/websocket";
import { pollResults } from "./socket/poll-results";

const app = fastify()

app.register(cookie, {
  secret: 'your-secret-here',
  hook: 'onRequest',
})

app.register(websocket)

app.register(createPoll)
app.register(getPoll)
app.register(voteOnPoll)
app.register(pollResults)

app.listen({ port: 3333 }).then(() => {
  console.log('server listening on port 3333')
})