import { getRedisConfig } from "../../config/redis.configuration";
import { Producer } from "../../lib/producer";
import { GOOD_QUEUE, Good, GoodjobTypeValues } from "./good.interface";

export const goodProducer = new Producer<Good, GoodjobTypeValues>(GOOD_QUEUE, {
  connection: getRedisConfig(),
});

export const goodQueue = goodProducer.getQueue();
