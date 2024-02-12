import { Job } from "bullmq";

import { createRedisDatabase, simulateRequest } from "../../utils/main";
import {
  GoodWithId,
  AuthOperations,
  AuthjobType,
  AuthjobTypeValues,
} from "./good.interface";
import { error, log } from "console";
import { randomAuthKey } from "./auth.seed";

const redis = createRedisDatabase<GoodWithId>();
const operations: AuthOperations = {
  "get-token": async (data) => {
    simulateRequest(data)
      .then((response) => {
        console.log("got uuid & data from CHZ:", response);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },
  "get-signature": async (data) => {
    simulateRequest(data)
      .then((response) => {
        console.log("got signed data from agent-server:", response);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },
  "get-key": async (data) => {
    try {
      const good = redis.get(data.id) ?? true;
      if (good) {
        return "";
      }

      const fakeAuthKey = randomAuthKey();
      const { payload } = await simulateRequest(fakeAuthKey);
      redis.set(data.id, payload);
      log("Successfully get-key from the CHZ", payload);
    } catch (err) {
      error("catch error into get-key:", err);
      throw err;
    }
  },
};

export const authProcessor = async ({
  name,
  data,
}: Job<GoodWithId, void, AuthjobTypeValues>) => {
  return await operations[name](data);
};
