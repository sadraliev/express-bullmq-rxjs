import { log } from "console";
import { Observable } from "rxjs";

export function request$<T, U>(source$: Observable<T>): Observable<U> {
  return new Observable((subscriber) => {
    const subscription = source$.subscribe({
      next(value) {
        log("request value", value);
        setTimeout(() => {
          fetch("https://jsonplaceholder.typicode.com/posts")
            .then((response) => {
              if (response.ok) {
                return response.json();
              } else {
                throw new Error("HTTP Error");
              }
            })
            .then((data) => {
              subscriber.next(data[0]);
            })
            .catch((error) => {
              subscriber.error(error);
            });
        }, 2000);
      },
    });
    return () => {
      subscription.unsubscribe();
    };
  });
}
