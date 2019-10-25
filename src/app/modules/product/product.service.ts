import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL_TOKEN } from '../../../injection-tokens/base-url.token';
import { ProductInterface } from './model/product.interface';
import { Observable } from 'rxjs';

@Injectable()
export class ProductService {
  constructor(private http: HttpClient, @Inject(BASE_URL_TOKEN) private apiUrl) {}
  postProduct(product: ProductInterface): Observable<ProductInterface> {
    return this.http.post<ProductInterface>(`${this.apiUrl}/product`, product);
  }

  putProduct(product: ProductInterface, productId: number): Observable<ProductInterface> {
    return this.http.put<ProductInterface>(`${this.apiUrl}/product/${productId}`, product);
  }

  deleteProduct(productId: number) {
    return this.http.delete(`${this.apiUrl}/product/${productId}`);
  }

  getProductById(productId: number): Observable<ProductInterface> {
    return this.http.get<ProductInterface>(`${this.apiUrl}/product/${productId}`);
  }

  getProducts(): Observable<ProductInterface[]> {
    return this.http.get<ProductInterface[]>(`${this.apiUrl}/product`);
  }
}
