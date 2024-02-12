import { getRedisConfig } from "../../config/redis.configuration";
import { Producer } from "../../lib/producer";
import { AUTH_QUEUE, GoodWithId, AuthjobTypeValues } from "./good.interface";

export const authProducer = new Producer<GoodWithId, AuthjobTypeValues>(
  AUTH_QUEUE,
  {
    connection: getRedisConfig(),
  }
);

export const authQueue = authProducer.getQueue();
