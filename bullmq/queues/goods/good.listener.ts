import { QueueEvents } from "bullmq";
import { GOOD_QUEUE } from "./good.interface";

export const goodEvents = new QueueEvents(GOOD_QUEUE);
