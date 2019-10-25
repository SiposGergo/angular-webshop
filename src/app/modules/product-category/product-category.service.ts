import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL_TOKEN } from '../../../injection-tokens/base-url.token';
import { Observable } from 'rxjs';
import { ProductCategoryInterface } from './model/product-category.interface';

@Injectable()
export class ProductCategoryService {
  constructor(private http: HttpClient, @Inject(BASE_URL_TOKEN) private apiUrl) {}
  postProductCategory(productCategory: ProductCategoryInterface): Observable<ProductCategoryInterface> {
    return this.http.post<ProductCategoryInterface>(`${this.apiUrl}/product-category`, productCategory);
  }

  putProductCategory(
    productCategory: ProductCategoryInterface,
    productCategoryId: number
  ): Observable<ProductCategoryInterface> {
    return this.http.put<ProductCategoryInterface>(
      `${this.apiUrl}/product-category/${productCategoryId}`,
      productCategory
    );
  }

  deleteProductCategory(productCategoryId: number) {
    return this.http.delete(`${this.apiUrl}/product-category/${productCategoryId}`);
  }

  getProductCategoryById(productCategoryId: number): Observable<ProductCategoryInterface> {
    return this.http.get<ProductCategoryInterface>(`${this.apiUrl}/product-category/${productCategoryId}`);
  }

  getProductCategories(): Observable<ProductCategoryInterface[]> {
    return this.http.get<ProductCategoryInterface[]>(`${this.apiUrl}/product-category`);
  }
}
