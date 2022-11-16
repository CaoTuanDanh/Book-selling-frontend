import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../common/customer';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  private baseUrl = 'https://book-selling-backend.herokuapp.com/';
  private customerUrl= this.baseUrl+'apiCustomer/save';
  private customerUrlget= this.baseUrl+'apiCustomer/all';

  constructor(private httpClient: HttpClient) { }

  createCustomer(customer: Customer): Observable<any> {   
    return this.httpClient.post(this.customerUrl, customer);
  }

  getlistCustommer():Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(this.customerUrlget);
  }
}
