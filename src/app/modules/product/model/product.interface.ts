import { ProductCategoryInterface } from '../../product-category/model/product-category.interface';
import { ProductTypeEnum } from './product-type.enum';
import { ProductComponentInterface } from './product-component.interface';

export interface ProductInterface {
  id?: number;
  name: string;
  image: string;
  productCategoryId: number;
  productCategory?: ProductCategoryInterface;
  netPrice: number;
  description: string;
  labels: string[];
  productType: ProductTypeEnum;
  components: ProductComponentInterface[];
}
