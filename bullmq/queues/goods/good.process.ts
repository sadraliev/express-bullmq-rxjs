import { Job } from "bullmq";

import { simulateRequest } from "../../utils/main";
import { Good } from "./good.interface";

const operations = {
  uploadGood(data: Good) {
    simulateRequest(data)
      .then((response) => {
        console.log("upload good to CHZ:", response);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },
  insertDataBase(data: Good) {
    simulateRequest(data)
      .then((response) => {
        console.log("insert good to database:", response);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },
};

export const UploadProcessor = async (job: Job<Good>) =>
  operations.uploadGood(job.data);

export const insertDataBase = async (job: Job<Good>) =>
  operations.insertDataBase(job.data);
