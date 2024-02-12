import express from "express";
import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { ExpressAdapter } from "@bull-board/express";
import { mailProducer, mailQueue, randomEmail } from "./queues/mail";
import { MailjobType } from "./queues/mail/mail.interface";
import { goodProducer, goodQueue, randomGood } from "./queues/goods";
import { authQueue } from "./queues/auth";
import { simulateRequest } from "./utils/main";

const app = express();

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/bullmq/dashboard");

createBullBoard({
  queues: [
    new BullMQAdapter(mailQueue),
    new BullMQAdapter(goodQueue),
    new BullMQAdapter(authQueue),
  ],
  serverAdapter,
});

app.use("/bullmq/dashboard", serverAdapter.getRouter());

app.get("/goods", async (_, res) => {
  await simulateRequest({}, 10000);
  res.json({
    ok: true,
  });
});

app.post("/goods", (_, res) => {
  const good = randomGood();
  goodProducer.add("insert-good", good);

  res.json({
    ok: true,
    message: "good accepted for processing",
    data: good,
  });
});

app.get("/run", (_, res) => {
  const sender = randomEmail();
  const receiver = randomEmail();

  mailProducer.add(MailjobType.mailProcess, {
    from: sender,
    subject: "This is a simple test",
    text: "An email sent using BullMQ",
    to: receiver,
  });

  console.log(`Enqueued an email sending to ${receiver}`);

  res.json({
    ok: true,
  });
});

app.listen(3000, () => {
  console.log("Running on 3000...");
  console.log("For the UI, open http://localhost:3000/bullmq/dashboard");
  console.log("Make sure Redis is running on port 6379 by default");
  console.log("To populate the queue, run:");
  console.log("  curl http://localhost:3000/add?title=Example");
  console.log("To populate the queue with custom options (opts), run:");
  console.log("  curl http://localhost:3000/add?title=Test&opts[delay]=9");
});
