import { Worker } from "bullmq";
import { getRedisConfig } from "../../config/redis.configuration";
import { AUTH_QUEUE } from "./good.interface";
import { authProcessor } from "./auth.processor";
import { goodProducer } from "../goods";

export const authWorker = new Worker(AUTH_QUEUE, authProcessor, {
  connection: getRedisConfig(),
});

authWorker.on("completed", async ({ name, returnvalue, remove }) => {
  if (name === "get-key" && returnvalue !== undefined) {
    goodProducer.add("good-process", returnvalue);
  }
});

authWorker.on("failed", (job, err) =>
  console.error(`Failed job ${job?.id} with ${err}`)
);
