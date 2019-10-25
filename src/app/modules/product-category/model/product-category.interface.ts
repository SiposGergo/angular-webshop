import { TaxInterface } from '../../tax/model/tax.interface';

export interface ProductCategoryInterface {
  id?: number;
  name: string;
  taxCategoryId: number;
  tax?: TaxInterface;
  description: string;
}
