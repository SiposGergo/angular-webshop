import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatTaxPipe } from './format-tax.pipe';

@NgModule({
  declarations: [FormatTaxPipe],
  exports: [FormatTaxPipe],
  imports: [CommonModule]
})
export class PipeModule {}
