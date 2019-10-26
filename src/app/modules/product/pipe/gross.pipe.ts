import { Pipe, PipeTransform } from '@angular/core';
import { ProductCategoryInterface } from '../../product-category/model/product-category.interface';

@Pipe({
  name: 'gross'
})
export class GrossPipe implements PipeTransform {
  transform(netPrice: number, selectedProductCategory: ProductCategoryInterface): any {
    if (selectedProductCategory && selectedProductCategory.tax) {
      return netPrice * ((100 + selectedProductCategory.tax.percent) / 100);
    }
  }
}
