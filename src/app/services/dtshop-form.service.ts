import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Tinhthanh } from '../common/tinhthanh';


@Injectable({
  providedIn: 'root'
})
export class DTShopFormService {

  private baseUrl = 'https://book-selling-backend.herokuapp.com/';

  private tinhthanhUrl = this.baseUrl+'apiTinhthanh/all';
  private huyenUrl = this.baseUrl+'apiHuyen/huyen/';
  private xaUrl =this.baseUrl+'apiXa/xa/';

  constructor(private httpClient: HttpClient) { }

  getTinhthanh(): Observable<Tinhthanh[]> {
    return this.httpClient.get<Tinhthanh[]>(this.tinhthanhUrl);
  }

  getHuyenByTinhId(tinhthanhId: number): Observable<any> {
    return this.httpClient.get(this.huyenUrl+tinhthanhId);
  }

  getXaByHuyenId(huyenId: number): Observable<any> {
    return this.httpClient.get(this.xaUrl+huyenId);
  }
}


