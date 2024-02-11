import { Worker } from "bullmq";
import { MailProcessor } from "./mail.process";
import { getRedisConfig } from "../../config/redis.configuration";
import { MAIL_QUEUE } from "./mail.interface";

export const mailWorker = new Worker(MAIL_QUEUE, MailProcessor, {
  connection: getRedisConfig(),
});

mailWorker.on("completed", (job) =>
  console.log(`Completed job ${job.id} successfully`)
);

mailWorker.on("progress", (job) => console.log("processes job", job?.id));

mailWorker.on("failed", (job, err) =>
  console.log(`Failed job ${job?.id} with ${err}`)
);
