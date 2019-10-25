import { Pipe, PipeTransform } from '@angular/core';
import { isFunction } from '../../../utils/type-guard/is-function';

@Pipe({
  name: 'showError'
})
export class ShowErrorPipe implements PipeTransform {
  transform(value: string | ((object) => string), errors: object): string {
    if (isFunction(value)) {
      return value(errors);
    }
    return value;
  }
}
