import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Customer } from 'src/app/common/customer';
import { LoginService } from 'src/app/services/login.service';
import { LoginStatusComponent } from '../login-status/login-status.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isClick: boolean = false;
  isLogin: boolean = false;
  private a: LoginStatusComponent
  customer: Customer= new Customer();
  constructor(private loginService: LoginService,
    private router: Router) { }

  ngOnInit(): void {


  }

  handleLogin(){  
    this.loginService.authenticationService(this.customer.email,this.customer.password);
  }

}
