import { Inject, Injectable } from '@angular/core';
import { Http, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { BackendUri } from './app-settings';
import { Product } from './product';
import { ProductFilter } from './product-filter';

@Injectable()
export class ProductService {

  constructor(
    private _http: Http,
    @Inject(BackendUri) private _backendUri) { }

  getProducts(filter: ProductFilter): Observable<Product[]> {
    let params = new URLSearchParams();
    
      params.set('_order', 'DESC');
      params.set('_sort', 'publishedDate');

    if(filter && filter != null){

      if(filter.text && filter.text != null){
        params.set('q', filter.text); 
      }
      if (filter.category && filter.category != null) {
        params.set('category.id', filter.category); 
      }
      if (filter.state && filter.state != null){
        params.set('state', filter.state);
      }
    }

      let options = new RequestOptions();
      options.search = params;
      
      return this._http
        .get(`${this._backendUri}/products`, options)
        .map((data: Response): Product[] => Product.fromJsonToList(data.json()));
    }
    
  getProduct(productId: number): Observable<Product> {
    return this._http
      .get(`${this._backendUri}/products/${productId}`)
      .map((data: Response): Product => Product.fromJson(data.json()));
  }

  buyProduct(productId: number): Observable<Product> {
    const body: any = { 'state': 'sold' };
    return this._http
      .patch(`${this._backendUri}/products/${productId}`, body)
      .map((data: Response): Product => Product.fromJson(data.json()));
  }

  setProductAvailable(productId: number): Observable<Product> {
    const body: any = { 'state': 'selling' };
    return this._http
      .patch(`${this._backendUri}/products/${productId}`, body)
      .map((data: Response): Product => Product.fromJson(data.json()));
  }

}
