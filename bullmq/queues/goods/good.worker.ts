import { Worker } from "bullmq";
import { getRedisConfig } from "../../config/redis.configuration";
import { insertDataBase } from "./good.process";
import { GOOD_QUEUE } from "./good.interface";

export const goodWorker = new Worker(GOOD_QUEUE, insertDataBase, {
  connection: getRedisConfig(),
});

goodWorker.on("completed", (job) =>
  console.log(`Completed job ${job.id} successfully`)
);

goodWorker.on("progress", (job) => console.log("processes job", job?.id));

goodWorker.on("failed", (job, err) =>
  console.log(`Failed job ${job?.id} with ${err}`)
);
