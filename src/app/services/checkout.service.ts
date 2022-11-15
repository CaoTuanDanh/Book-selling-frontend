import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from '../common/address';
import { Customer } from '../common/customer';
import { Order } from '../common/order';
import { OrderItem } from '../common/order-item';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private baseUrl = 'https://book-selling-backend.herokuapp.com/';

  private addressUrl= this.baseUrl+'apiAddress/save';
  private orderUrl= this.baseUrl+'apiOrder/save';
  private orderitemUrl= this.baseUrl+'apiOrderItem/save';

  private customerUrlgetByemail= this.baseUrl+'apiCustomer/email/';
  constructor(private httpClient: HttpClient) { }

  createAddress(address: Address): Observable<any> {   
    return this.httpClient.post(this.addressUrl, address);
  }

  getCustommerByEmail(email: string):Observable<Customer> {
    return this.httpClient.get<Customer>(this.customerUrlgetByemail+email);
  }

  createOrder(order: Order): Observable<any> {   
    return this.httpClient.post(this.orderUrl, order);
  }
  
  createOrderItem(orderItem: OrderItem): Observable<any> {   
    return this.httpClient.post(this.orderitemUrl, orderItem);
  }
}

