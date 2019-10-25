import { FormGroup as AngularFormGroup } from '@angular/forms';
import { isPresent } from '../type-guard/is-present';
import { Observable } from 'rxjs';

export class FormGroup extends AngularFormGroup {
  submitted: boolean;
  isSubmitting: boolean;

  statusChanges: Observable<any>;

  constructor(props) {
    super(props);
    this.submitted = false;
    this.isSubmitting = false;
  }

  startSubmit() {
    this.disable();
    this.isSubmitting = true;
  }

  endSubmit() {
    this.enable();
    this.isSubmitting = false;
  }

  reset() {
    this.submitted = false;
    super.reset();
  }

  // Angular 8-ban már létezik
  markAllAsTouched() {
    Object.keys(this.controls).forEach(field => {
      const control = this.get(field);
      if (isPresent(control)) {
        control.markAsTouched({ onlySelf: true });
      }
    });
  }
}
