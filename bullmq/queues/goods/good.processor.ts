import { Job } from "bullmq";

import { simulateRequest } from "../../utils/main";
import { Good, GoodOperations, GoodjobTypeValues } from "./good.interface";
import { info, log, error } from "console";
import { randomGoodId } from "./good.seed";
import { authProducer } from "../auth/auth.queue";

const operations: GoodOperations = {
  "good-process": async (data: Good) => {
    try {
      const { payload } = await simulateRequest(data);
      log("Successfully upload to the CHZ", payload);
      info("finished");
    } catch (err) {
      error("catch error into good-process:", err);
    }
  },
  "insert-good": async (data: Good) => {
    try {
      const { payload } = await simulateRequest(data);
      log("Successfully added to the database", payload);

      return { ...payload, id: randomGoodId() };
    } catch (err) {
      error("catch error into insert-good:", err);
      throw err;
    }
  },
};

export const goodProcessor = async ({
  name,
  data,
}: Job<Good, void, GoodjobTypeValues>) => {
  return await operations[name](data);
};
