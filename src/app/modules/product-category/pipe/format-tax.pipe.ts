import { Pipe, PipeTransform } from '@angular/core';
import { TaxInterface } from '../../tax/model/tax.interface';
import { isPresent } from '../../../../utils/type-guard/is-present';

@Pipe({
  name: 'formatTax'
})
export class FormatTaxPipe implements PipeTransform {
  transform(tax: TaxInterface | undefined): any {
    if (isPresent(tax)) {
      return `${tax.name} - ${tax.percent}%`;
    } else {
      return 'Áfa kategória nem található';
    }
  }
}
