import { info, log } from "console";
import express, { Request, Response, response } from "express";
import {
  Observable,
  catchError,
  delay,
  filter,
  from,
  map,
  mergeAll,
  of,
  switchMap,
  tap,
  throwError,
  timer,
} from "rxjs";
import "./publisher";
import { request$ } from "./operators";
import { authQueue } from "./publisher";

const app = express();
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  const good$ = new Observable((subscriber) => {
    const good = req.query["good"];
    if (!good) {
      subscriber.error("Good not exists");
    }
    subscriber.next(good);
    return () => {};
  }).pipe(
    tap(() =>
      res.send("We will sent notification when product will be create")
    ),
    request$,
    tap(() => info("after request"))
  );

  good$.subscribe({
    next(sub) {
      console.log("got value ", sub);
    },
    error(err) {
      console.error("something wrong occurred: " + err);
    },
    complete() {
      console.log("done");
    },
  });
});
app.get("/get", (req: Request, res: Response) => {
  info("/get", Date.now());
  return res.send("Got GET /get request");
});

app.post("/products", (req: Request, res: Response) => {
  /**
   * - готовые продукты
   * - получить access_token
   *  - если нет:
   * - отправить товар на модерацию
   *  */
});

app.listen(port, () => {
  console.log(`Server runs on ${port} port`);
});
