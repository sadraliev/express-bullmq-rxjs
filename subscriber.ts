import { Worker } from "bullmq";

// Запускаем Worker для обработки уведомлений
const notificationWorker = new Worker("notifications", async (job) => {
  const { message } = job.data;
  console.log(`Получено уведомление: "${message}"`);
});
