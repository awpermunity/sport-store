import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, Http, ResponseOptions } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { Product } from './../../model/product.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class StoreService {

  private url = 'http://localhost:3000/';
  private productsGroupUrl = this.url + 'productsGroup';
  private productSizesUrl = this.url + 'productSizesUrl';
  private httpOptions;
  constructor(
    private http: HttpClient
  ) {
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsGroupUrl)
  }

  getProduct(id: number): Observable<Product> {
    const url = `${this.productsGroupUrl}/${id}`;
    return this.http.get<Product>(url);
  }

  updateProduct(product: any): Observable<Product> {
    const HEADERS = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put(`${this.productsGroupUrl}/${product.id}`, product, HEADERS)
      .map(response => console.log('response', response))
      .catch((e: any) => Observable.throw(this.errorHandler(e)));
  }

  errorHandler(error: any) {
    console.log('ERRROR', error)
  }

}

