import { error, info, log } from "console";
import {
  EMPTY,
  Observable,
  catchError,
  interval,
  map,
  of,
  switchMap,
  tap,
  throwError,
  zip,
} from "rxjs";
import { ajax } from "rxjs/ajax";
const tick$ = interval(500);
const data$ = of("1", "2", 3, "4", "5");
const stream$ = zip(tick$, data$);

function calculate$(data: any): Observable<string | never> {
  return typeof data === "string"
    ? of(data.toUpperCase())
    : throwError(() => "error ");
}
stream$
  .pipe(
    switchMap(([_, data]) =>
      calculate$(data).pipe(
        catchError((error) => {
          log("catchError", error);
          return EMPTY;
        })
      )
    ),

    tap({ next: info, error }),
    map((string) => string[0])
  )
  .subscribe({
    next: (value) => console.log("subscribe", value),
    error: (error) => {
      log("subscribe catch error", error.message);
    },
  });
