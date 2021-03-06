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

        params.set('q', filter.text); 
        params.set('category.id', filter.category); 
        params.set('state', filter.state);

      if (filter.priceMin && !filter.priceMax){
        params.set('price_gte', `${filter.priceMin}`);
        params.set('_order', 'ASC');
        params.set('_sort', 'price');
      }

      if (filter.priceMax && !filter.priceMin){
        params.set('price_lte', `${filter.priceMax}`);
        params.set('_order', 'ASC');
        params.set('_sort', 'price');
      }
      
      if (filter.priceMax && filter.priceMax != null && filter.priceMin && filter.priceMin != null ){
        params.set('price_gte', `${filter.priceMin}`);
        params.set('price_lte', `${filter.priceMax}`);
        params.set('_order', 'ASC');
        params.set('_sort', 'price');
      }

      if (filter.order && filter.order != null){
        params.set('_order', 'ASC');
        params.set('_sort', filter.order);
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
