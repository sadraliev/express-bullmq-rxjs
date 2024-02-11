export function simulateRequest(data: any = { payload: "tesla X" }) {
  return new Promise((resolve, reject) => {
    const delay = Math.random() * 5000;
    setTimeout(() => {
      const status = Math.random() < 0.5 ? 200 : 400;
      const errorMessage =
        status === 400 ? `Error: Rate limit error occurred` : null;
      if (status === 200) {
        resolve({ status, message: "Success", data });
      } else {
        reject({ status, message: errorMessage });
      }
    }, delay);
  });
}
