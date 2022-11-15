import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'src/app/common/customer';
import { DTShopFormService } from 'src/app/services/dtshop-form.service';
import { SignupService } from 'src/app/services/signup.service';
import { DTShopValidators } from 'src/app/validators/dtshop-validators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  customer: Customer = new Customer();

  signupFormGroup: FormGroup;
  isOK: boolean;
  listCustomer: Customer[];

  constructor(private formBuilder: FormBuilder,
    private signupService: SignupService,
    private router: Router) { }

  ngOnInit(): void {

    this.signupFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('',
          [Validators.required,
          Validators.minLength(2),
          DTShopValidators.notOnlyWhitespace]),

        lastName: new FormControl('',
          [Validators.required,
          Validators.minLength(2),
          DTShopValidators.notOnlyWhitespace]),
        email: new FormControl('',
          [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
        password: new FormControl('',
          [Validators.required,
          Validators.minLength(8),
          DTShopValidators.notOnlyWhitespace]),
        confirm_password: new FormControl('',
          [Validators.required,
          Validators.minLength(8),
          DTShopValidators.notOnlyWhitespace]),
      })
    });
  }

  get firstName() { return this.signupFormGroup.get('customer.firstName'); }
  get lastName() { return this.signupFormGroup.get('customer.lastName'); }
  get email() { return this.signupFormGroup.get('customer.email'); }
  get password() { return this.signupFormGroup.get('customer.password'); }
  get confirm_password() { return this.signupFormGroup.get('customer.confirm_password'); }
  onSubmit() {

    if (this.signupFormGroup.invalid) {
      this.signupFormGroup.markAllAsTouched();
      return;
    }
    this.customer = this.signupFormGroup.controls['customer'].value;
    if (this.password?.value != this.confirm_password?.value) {
      alert('nhập lại mật khẩu chưa đúng')
    }      
    else 
    {
    this.checkListCustomer(); 
    }
  }

  checkListCustomer() {
    this.signupService.getlistCustommer().subscribe(data => {
      this.listCustomer = data;
      for (let i = 0; i < this.listCustomer.length; i++) {
        if (this.listCustomer[i].email == this.customer.email) {
          //console.log('tài khoản đã tồn tại');
          alert('tài khoản đã tồn tại');
          this.isOK = false;
          break;
        }
        else this.isOK = true;
      }
      this.handleSignup();
    }
    )
  }

  handleSignup() {
    if(this.isOK == true){
    this.signupService.createCustomer(this.customer).subscribe(
      data => {
       //console.log(data),
          alert('đăng kí thành công'),
          this.router.navigateByUrl("/login");
      }, error => console.log(error))
    }
  }

}
