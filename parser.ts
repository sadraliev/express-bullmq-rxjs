import * as XLSX from "xlsx";
import { z } from "zod";

const itemSchema = z
  .object({
    "Код ТНВЭД": z.coerce.number(),
    "Код категории": z.coerce.number(),
    "Полное наименование товара": z.string(),
    "Товарный знак": z.string(),
    "Модель / артикул производителя": z.string(),
    "Модель / артикул производителя_1": z.string(),
    "Вид обуви": z.string(),
    Цвет: z.string(),
    "Размер в штихмассовой системе": z.coerce.number(),
    "Материал верха": z.string(),
    "Материал подкладки": z.string(),
    "Материал низа / подошвы": z.string(),
    "Код ТНВЭД_1": z.number().refine((num) => num.toString().length <= 10, {
      message: "Длина числа не должна превышать 10 символов",
    }),
    "Статус карточки товара в Каталоге": z.string(),
  })
  .required();

itemSchema.partial({
  "Код категории": true,
});

type Item = z.infer<typeof itemSchema>;

async function readExcelFile(filePath: string): Promise<any[]> {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  return XLSX.utils.sheet_to_json(sheet);
}

const filePath = "./test.xlsx"; // unknown []

// validation -> типизируем  YES-> (100% ТИПЫ) NO -> unknown -> edit

type Validated = {
  validItems: Array<Item>;
  invalidItems: Array<unknown>;
};
const validate = (validItem: unknown) => {
  const items: Validated = {
    validItems: [],
    invalidItems: [],
  };
  try {
    const validatedItem = itemSchema.parse(validItem);
    items.validItems.push(validatedItem);
  } catch (error) {
    console.log("validItem", validItem);
    console.log("error", error);
    items.invalidItems.push({ item: [validItem], errors: [error] });
  }
  return items;
};

const getValidItems = (item: Validated) => {
  return item.validItems;
};
const getInvalidItems = (item: Validated) => {
  return item.invalidItems;
};

readExcelFile(filePath)
  .then((data) => {
    const headless = data.slice(3);
    headless
      .map(validate)
      .map((v) => console.log("Данные валидны:", getValidItems(v)));
  })
  .catch((error) => {
    console.error("Ошибка при чтении файла:", error);
  });
