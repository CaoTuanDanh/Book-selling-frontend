import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Customer } from '../common/customer';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = 'https://book-selling-backend.herokuapp.com/';

  private findCusByEmailUrl = this.baseUrl+'apiCustomer/';
  private findAllCus =this.baseUrl+'apiCustomer/all';

  email_storage = 'email'
  password_strorage = 'password'

  isLogin: boolean;
  isValid: boolean= false;

  storage: Storage = sessionStorage;

  customers: Customer[];


  constructor(private httpClient: HttpClient,
    private router: Router) { }


  authenticationService(email: String, password: String) {
    this.getAllCustomer().subscribe(data=> 
      {
        this.customers=data;
       // console.log(this.customers)
        for (let i=0; i < this.customers.length; i++) {
          if(this.customers[i].email==email && this.customers[i].password==password){
            this.registerSuccessfulLogin(email, password);
            this.isValid = true;
            break;
          }
          else{
            this.isValid= false;
          }
        }
        this.loginDoneorNot()
      })
  }

  getCusByEmail(email: string): Observable<any> {
    return this.httpClient.get(this.findCusByEmailUrl+email);
  }
  
  getAllCustomer(): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(this.findAllCus);
  }

  registerSuccessfulLogin(email, password) {
    this.storage.setItem(this.email_storage, email);
    //console.log(this.storage);
    //console.log(email, password)
  }

  logout() {
    this.isLogin= false;
    this.storage.removeItem(this.email_storage);
    //console.log(this.storage)
    alert('đã đăng xuất');
    this.router.navigateByUrl("/products");
  }
  // kiểm tra đúng tài khoản -> cho đăng nhập
  loginDoneorNot(){
    if(this.isValid == true){
      this.isLogin = true;
      alert('đăng nhập thành công');
      this.router.navigateByUrl("/products");
    }else
    {
      this.isLogin = false;
      //console.log('sai tài khoản hoặc mật khẩu');
      alert('sai tài khoản hoặc mật khẩu');
    }
    return this.isLogin;
  }
}
