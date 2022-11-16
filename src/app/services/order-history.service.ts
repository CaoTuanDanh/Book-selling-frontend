import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../common/customer';
import { Order } from '../common/order';
import { OrderHistory } from '../common/order-history';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {

  private baseUrl = 'https://book-selling-backend.herokuapp.com/';

  private orderUrlget= this.baseUrl+'apiOrder/customer/';
  private customerUrlgetByemail= this.baseUrl+'apiCustomer/email/';

  constructor(private httpClient: HttpClient) { }

  getListOrderByCusId(customerId: number):Observable<Order[]>{
    return this.httpClient.get<Order[]>(this.orderUrlget+customerId);
  }

  getCustommerByEmail(email: string):Observable<Customer> {
    return this.httpClient.get<Customer>(this.customerUrlgetByemail+email);
  }
}
