import { Pipe, PipeTransform } from '@angular/core';
import { ProductTypeEnum } from '../model/product-type.enum';

@Pipe({
  name: 'productType'
})
export class ProductTypePipe implements PipeTransform {
  transform(value: ProductTypeEnum): any {
    if (value === ProductTypeEnum.simple) {
      return 'Egyszerű';
    } else if (value === ProductTypeEnum.composite) {
      return 'Összetett';
    } else {
      return '';
    }
  }
}
