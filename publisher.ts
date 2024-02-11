import { Queue, Worker } from "bullmq";
import IORedis from "ioredis";
const connection = new IORedis({
  host: "127.0.0.1",
  port: 6379,
  maxRetriesPerRequest: null,
});

export const productQueue = new Queue("product", { connection });
export const authQueue = new Queue("auth", { connection });
