import { Queue, QueueOptions } from "bullmq";

export class Producer<T, U extends string> {
  private queue: Queue;
  private name: string;

  constructor(name: string, opts: QueueOptions) {
    this.queue = new Queue<T>(name, opts);
    this.name = name;
  }

  async add(jobName: U, data: T) {
    return await this.queue.add(jobName, data);
  }

  close() {
    return this.queue.close();
  }
  getQueue() {
    return this.queue;
  }
  getName() {
    return this.name;
  }
}
