import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { FormControl, FormGroupDirective } from '@angular/forms';
import { VALIDATION_MESSAGES } from '../validation.token';
import { ValidationMessages } from '../model/validation-messages.interface';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { isPresent } from '../../../../utils/type-guard/is-present';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ValidationComponent implements OnChanges, OnInit {
  @Input() messages: ValidationMessages;
  @Input() controlName: string;
  tplMessages: ValidationMessages = this.validationMessages;
  @Input() control: FormControl;

  constructor(
    @Inject(VALIDATION_MESSAGES) private validationMessages: ValidationMessages,
    private formGroupDirective: FormGroupDirective,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.messages !== undefined && isPresent(changes.messages.currentValue)) {
      this.tplMessages = { ...this.validationMessages, ...changes.messages.currentValue };
    }
  }

  ngOnInit(): void {
    if (!isPresent(this.control) && isPresent(this.formGroupDirective)) {
      this.control = this.formGroupDirective.control.get(this.controlName) as FormControl;
    }
    this.control.statusChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(200)
      )
      .subscribe(() => this.cdr.markForCheck());
  }
}
