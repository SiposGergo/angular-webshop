import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationComponent } from './validation/validation.component';
import { ShowErrorPipe } from './show-error.pipe';

@NgModule({
  declarations: [ValidationComponent, ShowErrorPipe],
  imports: [CommonModule],
  exports: [ValidationComponent]
})
export class ValidationModule {}
