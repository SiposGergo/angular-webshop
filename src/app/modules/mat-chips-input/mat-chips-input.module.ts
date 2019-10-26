import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsInputComponent } from './mat-chips-input/mat-chips-input.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ValidationModule } from '../validation/validation.module';

@NgModule({
  declarations: [MatChipsInputComponent],
  exports: [MatChipsInputComponent],
  imports: [CommonModule, MatChipsModule, MatIconModule, ReactiveFormsModule, MatInputModule, ValidationModule]
})
export class MatChipsInputModule {}
