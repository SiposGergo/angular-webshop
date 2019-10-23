import { Observable } from 'rxjs';
import { isPresent } from '../type-guard/is-present';

export const isPresentValue = () => <T>(source: Observable<T>) =>
  new Observable<T>(observer =>
    source.subscribe({
      next(x): void {
        if (isPresent(x)) {
          observer.next(x);
        }
      },
      error(err): void {
        observer.error(err);
      },
      complete(): void {
        observer.complete();
      }
    })
  );
