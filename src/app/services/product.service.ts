import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'https://book-selling-backend.herokuapp.com/';

  private listProduct = this.baseUrl+'api/all';

  private searchProByKey = this.baseUrl+'api/proname/';

  private categoryUrl= this.baseUrl+'apicate/all-cate';

  private searchcateUrl =this.baseUrl+'api/procate/';

  private proDetail =this.baseUrl+'api/pro/';

  constructor(private httpClient: HttpClient) { }


  getProductsList(): Observable<any> {
    return this.httpClient.get(this.listProduct);
  }

  getProductsListByCate(categoryid: number): Observable<any> {
    return this.httpClient.get(this.searchcateUrl+categoryid);
  }

  
  getProductsCategoryMenu(): Observable<any> {
    return this.httpClient.get(this.categoryUrl);
  }

  searchProducts(theKeyword: string): Observable<any> {
    return this.httpClient.get(this.searchProByKey+theKeyword);
  }

  getProduct(theProductId: number): Observable<Product> {
    return this.httpClient.get<Product>(this.proDetail+theProductId);
  }
}
