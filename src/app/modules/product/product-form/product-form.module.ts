import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductFormRoutingModule } from './product-form-routing.module';
import { ProductFormComponent } from './product-form/product-form.component';

@NgModule({
  declarations: [ProductFormComponent],
  imports: [CommonModule, ProductFormRoutingModule]
})
export class ProductFormModule {}
