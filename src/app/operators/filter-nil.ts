import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

const filterNil = <T>() => {
  return function <T>(source: Observable<T | undefined | null>) {
    return source.pipe(
      filter((value) => value !== undefined && value !== null)
    ) as Observable<T>;
  };
};

export default filterNil;
