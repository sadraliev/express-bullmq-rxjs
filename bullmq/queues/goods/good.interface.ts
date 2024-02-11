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
  insertGood: "insertGood",
} as const;
