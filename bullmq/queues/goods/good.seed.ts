import { faker } from "@faker-js/faker";

export interface Good {
  markCode: number;
  size: number;
  country: string;
  gtin: string;
  name: string;
}

export const randomGood = () => ({
  markCode: faker.number.int(),
  size: faker.number.int(50),
  country: faker.location.country(),
  gtin: faker.string.numeric(13),
  name: faker.commerce.productName(),
});
