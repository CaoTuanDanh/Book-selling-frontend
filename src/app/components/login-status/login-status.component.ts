import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {

  userFullName: string = '';

  storage: Storage = sessionStorage;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
     this.userFullName =this.loginService.storage.getItem('email')!;
  }
  logout(){
    this.loginService.logout();
    this.ngOnInit();
  }

  login(){  
    this.ngOnInit();
  }
}
