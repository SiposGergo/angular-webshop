import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-mat-chips-input',
  templateUrl: './mat-chips-input.component.html',
  styleUrls: ['./mat-chips-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatChipsInputComponent {
  @Input() textInputControl: FormControl;
  @Input() chipsControl: FormControl;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  isFocusInChips = false;

  constructor(private cdr: ChangeDetectorRef) {}

  focusIn() {
    this.isFocusInChips = true;
    this.cdr.markForCheck();
  }

  focusOut() {
    this.isFocusInChips = false;
    this.cdr.markForCheck();
  }

  removeChip(chipIndex: number) {
    (this.chipsControl.value as Array<string>).splice(chipIndex, 1);
  }

  addLabel() {
    if (this.textInputControl.valid) {
      const currentValue = this.chipsControl.value ? this.chipsControl.value : [];
      this.chipsControl.setValue([...currentValue, this.textInputControl.value]);
      this.textInputControl.reset();
    }
  }
}
