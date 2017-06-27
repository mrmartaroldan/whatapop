import { ProductFilter } from './product-filter';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Product } from './product';
import { ProductService } from './product.service';

@Injectable()
export class SoldProductsResolveService implements Resolve<Product[]> {

  //Inyección de dependencia
  constructor(private _productService: ProductService ){}

  resolve(route: ActivatedRouteSnapshot): Observable<Product[]>{
      let filter: ProductFilter={
        state: "sold"
      }
      return this._productService.getProducts(filter);
  }
}
