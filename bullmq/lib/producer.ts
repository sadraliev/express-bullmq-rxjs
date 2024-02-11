import { Queue, QueueOptions } from "bullmq";

export class Producer<T> {
  private queue: Queue;

  constructor(name: string, opts: QueueOptions) {
    this.queue = new Queue<T>(name, opts);
  }

  async enqueue(jobName: string, mail: T) {
    await this.queue.add(jobName, mail);
  }

  close() {
    return this.queue.close();
  }
  getQueue() {
    return this.queue;
  }
}
