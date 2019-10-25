import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL_TOKEN } from '../../../injection-tokens/base-url.token';
import { TaxInterface } from './model/tax.interface';
import { Observable } from 'rxjs';

@Injectable()
export class TaxService {
  constructor(private http: HttpClient, @Inject(BASE_URL_TOKEN) private apiUrl) {}
  postTax(tax: TaxInterface): Observable<TaxInterface> {
    return this.http.post<TaxInterface>(`${this.apiUrl}/tax`, tax);
  }

  putTax(tax: TaxInterface, taxId: number): Observable<TaxInterface> {
    return this.http.put<TaxInterface>(`${this.apiUrl}/tax/${taxId}`, tax);
  }

  deleteTax(taxId: number) {
    return this.http.delete(`${this.apiUrl}/tax/${taxId}`);
  }

  getTaxById(taxId: number): Observable<TaxInterface> {
    return this.http.get<TaxInterface>(`${this.apiUrl}/tax/${taxId}`);
  }

  getTaxes(): Observable<TaxInterface[]> {
    return this.http.get<TaxInterface[]>(`${this.apiUrl}/tax`);
  }
}
