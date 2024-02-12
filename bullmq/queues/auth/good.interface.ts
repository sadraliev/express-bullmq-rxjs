import { Good } from "../goods";

export type GoodWithId = Good & {
  id: string;
  token: string;
};

export const AUTH_QUEUE = "authQueue";
export const AuthjobType = {
  getToken: "get-token",
  getKey: "get-key",
  getSign: "get-signature",
} as const;

export type AuthjobTypeValues = (typeof AuthjobType)[keyof typeof AuthjobType];

type OperationFunction<T = GoodWithId, U = any> = (
  params: T
) => Promise<U | undefined>;

export type AuthOperations = {
  [key in AuthjobTypeValues]: OperationFunction;
};
