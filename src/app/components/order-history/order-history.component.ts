import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/common/customer';
import { Order } from 'src/app/common/order';
import { OrderHistory } from 'src/app/common/order-history';
import { LoginService } from 'src/app/services/login.service';
import { OrderHistoryService } from 'src/app/services/order-history.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  orderHistoryList: OrderHistory[];
  orderList: Order[]=[];
  storage: Storage = sessionStorage;
  email: string;
  customer: Customer;

  constructor(private orderHistoryService: OrderHistoryService,
    private loginService: LoginService) { }

  ngOnInit(): void {
    this.handleOrderHistory();
  }
  
  handleOrderHistory() {

    this.email = this.loginService.storage.getItem('email')!;

    this.orderHistoryService.getCustommerByEmail(this.email).subscribe(
      data=> 
      {
        this.customer= data
        this.orderHistoryService.getListOrderByCusId(this.customer.customer_id).subscribe(
          data => 
          {
            this.orderList = data;
          }
        )
      }
    )
  }
}
