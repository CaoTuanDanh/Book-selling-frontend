import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Observable<Product>;
  products!: Product;

  constructor(private productService: ProductService,
              private cartService: CartService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    })
  }

  handleProductDetails() {
    const theProductId: number = +this.route.snapshot.paramMap.get('id')!;

    this.product = this.productService.getProduct(theProductId);   
   
    this.productService.getProduct(theProductId).subscribe(
      data => {
        this.products = data;
      }
    )
  }

  addToCart() {

   // console.log(`Adding to cart: ${this.products.name}, ${this.products.unitPrice}`);
    const theCartItem = new CartItem(this.products);
    this.cartService.addToCart(theCartItem);
    
  }

}
