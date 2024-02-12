type Response = {
  payload?: any;
  status: number;
  message: string | null;
};

export function simulateRequest<T extends {} = {}>(
  data: T,
  time?: number
): Promise<Response> {
  return new Promise((resolve, reject) => {
    const delay = time ? time : Math.random() * 5000;
    setTimeout(() => {
      const status = Math.random() < 0.5 ? 200 : 400;
      const errorMessage =
        status === 400 ? `Error: Rate limit error occurred` : null;
      if (status === 200) {
        resolve({ status, message: "Success", payload: data });
      } else {
        reject({ status, message: errorMessage });
      }
    }, delay);
  });
}

interface RedisDatabase<T> {
  [key: string]: T;
}

export function createRedisDatabase<T>() {
  const redisDatabase: RedisDatabase<T> = {};

  function set(key: string, value: T) {
    redisDatabase[key] = value;
  }

  function get(key: string): T | null {
    if (key in redisDatabase) {
      return redisDatabase[key];
    } else {
      return null;
    }
  }

  return {
    set,
    get,
  };
}
