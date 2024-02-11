import { faker } from "@faker-js/faker";

export function getRandomEmail() {
  return faker.internet.email();
}
