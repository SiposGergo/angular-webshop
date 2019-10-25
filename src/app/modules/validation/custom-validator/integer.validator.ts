import { AbstractControl, ValidatorFn } from '@angular/forms';
import { isInt } from '../../../../utils/type-guard/is-int';
import { isPresent } from '../../../../utils/type-guard/is-present';

export function isIntegerValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const error = isPresent(control.value) && !isInt(control.value);
    return error ? { integer: { value: control.value } } : null;
  };
}
