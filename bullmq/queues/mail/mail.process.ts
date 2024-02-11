import { Job } from "bullmq";

import { Mail } from "./mail.interface";
import { simulateRequest } from "../../utils/main";

const transporter = {
  sendMail(post: Mail) {
    simulateRequest(post)
      .then((response) => {
        console.log("sent email:", response);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },
};

export const MailProcessor = async (job: Job<Mail>) =>
  transporter.sendMail(job.data);
