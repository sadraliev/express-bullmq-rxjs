export interface Good {
  markCode: number;
  size: number;
  country: string;
  gtin: string;
  name: string;
}
export const GOOD_QUEUE = "goodQueue";
export const GoodjobType = {
  goodProcess: "good-process",
  insertGood: "insert-good",
} as const;

export type GoodjobTypeValues = (typeof GoodjobType)[keyof typeof GoodjobType];

type OperationFunction<T = Good, U = void> = (
  params: T
) => Promise<U | undefined>;

export type GoodOperations = {
  [key in GoodjobTypeValues]: OperationFunction;
};
