import { mailProducer, mailQueue } from "./mail.queue";
import { getRandomEmail } from "./mail.seed";
import { mailWorker } from "./mail.worker";

export { mailProducer, mailQueue, mailWorker, getRandomEmail };
