import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Huyen } from 'src/app/common/huyen';
import { Tinhthanh } from 'src/app/common/tinhthanh';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { DTShopFormService } from 'src/app/services/dtshop-form.service';
import { DTShopValidators } from 'src/app/validators/dtshop-validators';
import { Order } from 'src/app/common/order';
import { OrderItem } from 'src/app/common/order-item';
import { Customer } from 'src/app/common/customer';
import { Address } from 'src/app/common/address';
import { Xa } from 'src/app/common/xa';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup;

  paymentMomo: boolean= false;

  totalPrice: number = 0;
  totalQuantity: number = 0;

  shippingAddressHuyens: Huyen[] = [];
  shippingAddressXas: Xa[]=[];


  shippingAddressTinhthanhs: Tinhthanh[] = [];
  
  hinhThucThanhToan: string;

  customerTemp: Customer;
  orderTemp: Order;
  sPayment: string;
  storage: Storage = sessionStorage;

  constructor(private formBuilder: FormBuilder,
    private DTShopFormService: DTShopFormService,
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private router: Router) { }
  ngOnInit(): void {

    this.reviewCartDetails();

    this.checkoutFormGroup = this.formBuilder.group({
      selectPayment: this.formBuilder.group({
        payment: new FormControl('',[Validators.required])
      }),
      shippingAddress: this.formBuilder.group({
        diachi: new FormControl('', [Validators.required, Validators.minLength(2),
        DTShopValidators.notOnlyWhitespace]),
        huyen: new FormControl('', [Validators.required]),
        xa: new FormControl('', [Validators.required]),
        tinhthanh: new FormControl('', [Validators.required]),
      })
    });

   this.DTShopFormService.getTinhthanh().subscribe(
      data => {
        //console.log("Retrieved countries: " + JSON.stringify(data));
        this.shippingAddressTinhthanhs = data;
      }
    );

  }


  reviewCartDetails() {

    // subscribe to cartService.totalQuantity
    this.cartService.totalQuantity.subscribe(
      totalQuantity => this.totalQuantity = totalQuantity
    );

    // subscribe to cartService.totalPrice
    this.cartService.totalPrice.subscribe(
      totalPrice => this.totalPrice = totalPrice
    );

  }
  get selectPayment(){return this.checkoutFormGroup.get('selectPayment.payment')}

  get shippingAddressDiachi() { return this.checkoutFormGroup.get('shippingAddress.diachi'); }
  get shippingAddressHuyen() { return this.checkoutFormGroup.get('shippingAddress.huyen'); }
  get shippingAddressTinhthanh() { return this.checkoutFormGroup.get('shippingAddress.tinhthanh'); }
  get shippingAddressXa() { return this.checkoutFormGroup.get('shippingAddress.xa'); }

  onChange(event){
    this.checkoutFormGroup.get('selectPayment.payment')?.valueChanges.subscribe(
      data =>{
      //console.log(data),
      this.sPayment = data;
      this.MomoHayTien(this.sPayment)
      }
      )   
  }

  MomoHayTien(sPayment: string){
    if(sPayment=='Thanh toán bằng ví MoMo'){
      this.paymentMomo = true;
    }else{
      this.paymentMomo = false;
    }
  }

  onSubmit() {
    if(this.storage.getItem('email') !=null){
    //console.log("Handling the submit button");
    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }
    // set up order
    let order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;
    order.payment = this.checkoutFormGroup.get('selectPayment.payment')?.value;
    //set up orderitem

    const cartItems = this.cartService.cartItems;

    let orderItems: OrderItem[] = [];
    // set up address
    let shippingAddress: Address = this.checkoutFormGroup.controls['shippingAddress']?.value;
    shippingAddress.huyen = this.checkoutFormGroup.controls['shippingAddress']?.value.huyen.name;
    shippingAddress.tinhthanh = this.checkoutFormGroup.controls['shippingAddress']?.value.tinhthanh.name;
    shippingAddress.xa = this.checkoutFormGroup.controls['shippingAddress']?.value.xa.name;
    shippingAddress.dia_chi = this.checkoutFormGroup.controls['shippingAddress']?.value.diachi;
    //console.log(shippingAddress);
    this.checkoutService.getCustommerByEmail(this.storage.getItem('email')!).subscribe(
      data => {
        this.customerTemp = data;
        order.customer_id = this.customerTemp.customer_id
        order.status ='Chờ xác nhận'
        this.checkoutService.createOrder(order).subscribe(
          data => {
            //console.log(data),
              this.orderTemp = data
            for (let i = 0; i < cartItems.length; i++) {
              orderItems[i] = new OrderItem(cartItems[i]);
              orderItems[i].order_id = this.orderTemp.order_id;
              this.checkoutService.createOrderItem(orderItems[i]).subscribe(
                data => {
                  //console.log(data)
                },
                error => console.log(error));
            }
            shippingAddress.order_id = this.orderTemp.order_id;
            this.checkoutService.createAddress(shippingAddress).subscribe(data => 
              //console.log(data), 
              error => console.log(error));
            this.resetCart();
            alert('Đơn hàng đang được khởi tạo. Bấm ok để hoàn tất.\nOrder tracking number:'+this.orderTemp.orderTrackingNumber);
          }, error => console.log(error))
      }
    ), error => console.log(error);
  }else{
    alert('bạn phải đăng nhập trước khi mua hàng');
    this.router.navigateByUrl("/login");
  }
}
  resetCart() {
    // reset cart data
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);

    // reset the form
    this.checkoutFormGroup.reset();

    // navigate back to the products page
    this.router.navigateByUrl("/products");
  }
  getHuyen(formGroupName: string) {
    const formGroup = this.checkoutFormGroup.get(formGroupName);

   // const countryName = formGroup?.value.tinhthanh.name;
    const tinhthanhId = formGroup?.value.tinhthanh.tinhthanh_id;

   // console.log(`${formGroupName} country name: ${countryName}`);

    this.DTShopFormService.getHuyenByTinhId(tinhthanhId).subscribe(
      data => {

        if (formGroupName === 'shippingAddress') {
          this.shippingAddressHuyens = data;
          this.DTShopFormService.getXaByHuyenId(this.shippingAddressHuyens[1].huyen_id).subscribe(
            data => {
      
              if (formGroupName === 'shippingAddress') {
                this.shippingAddressXas = data;
              }
              // select first item by default
              formGroup?.get('xa')?.setValue(data[0]);
            }
          );
        }
        // select first item by default
        formGroup?.get('huyen')?.setValue(data[0]);
      }
    );
  }

  getXa(formGroupName: string) {
    const formGroup = this.checkoutFormGroup.get(formGroupName);

    //const HuyenName = formGroup?.value.huyen.name;
    const huyenId = formGroup?.value.huyen.huyen_id;

   // console.log(`${formGroupName} country name: ${HuyenName}`);

    this.DTShopFormService.getXaByHuyenId(huyenId).subscribe(
      data => {

        if (formGroupName === 'shippingAddress') {
          this.shippingAddressXas = data;
        }
        // select first item by default
        formGroup?.get('xa')?.setValue(data[0]);
      }
    );
  }
}
