import { faker } from "@faker-js/faker";

export const randomAuthKey = () => ({
  uuid: faker.string.uuid(),
  data: faker.string.alphanumeric(20),
});
