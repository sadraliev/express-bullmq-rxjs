import { getRedisConfig } from "../../config/redis.configuration";
import { Producer } from "../../lib/producer";
import { GOOD_QUEUE, Good } from "./good.interface";

export const goodProducer = new Producer<Good>(GOOD_QUEUE, {
  connection: getRedisConfig(),
});

export const goodQueue = goodProducer.getQueue();
