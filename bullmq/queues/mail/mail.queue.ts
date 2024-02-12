import { getRedisConfig } from "../../config/redis.configuration";
import { Producer } from "../../lib/producer";
import { MAIL_QUEUE, Mail, MailTypeValues } from "./mail.interface";

export const mailProducer = new Producer<Mail, MailTypeValues>(MAIL_QUEUE, {
  connection: getRedisConfig(),
});

export const mailQueue = mailProducer.getQueue();
