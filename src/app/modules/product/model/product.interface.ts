export interface ProductInterface {
  id: number;
  name: string;
  autoPriceCalculation: boolean;
  image: string;
  taxId: number;
  netPrice: number;
  description: string;
  ingredients: number[];
  // properties: ProductProperiesModel[];
}
