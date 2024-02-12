import { Worker } from "bullmq";
import { getRedisConfig } from "../../config/redis.configuration";
import { goodProcessor } from "./good.processor";
import { GOOD_QUEUE } from "./good.interface";
import { error, log } from "console";
import { authProducer } from "../auth/auth.queue";
import { goodProducer } from "./good.queue";

export const goodWorker = new Worker(GOOD_QUEUE, goodProcessor, {
  connection: getRedisConfig(),
});

goodWorker.on("completed", ({ id, name, returnvalue }) => {
  log(`Completed job ${id}/${name} successfully`);
  if (name === "insert-good" && returnvalue !== undefined) {
    authProducer.add("get-key", returnvalue);
    return;
  }
});

goodWorker.on("progress", (job) => log("processes job", job?.id));

goodWorker.on("failed", (job, err) => {
  log(`Failed job ${job?.id}/${job?.name} with ${err.message}`);
  if (job?.name === "insert-good") {
    goodProducer.add("insert-good", job.data);
  }
});
goodWorker.on("error", (err) => {
  error(err);
});
