import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrossPipe } from './gross.pipe';
import { ProductTypePipe } from './product-type.pipe';

@NgModule({
  declarations: [GrossPipe, ProductTypePipe],
  exports: [GrossPipe, ProductTypePipe],
  imports: [CommonModule]
})
export class PipeModule {}
