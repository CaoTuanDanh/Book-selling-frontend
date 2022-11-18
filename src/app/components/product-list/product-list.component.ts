import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Observable<Product[]>;

  currentCategoryId: number;

  searchMode: boolean = false;
  
   isLoaded: boolean == true;

  constructor(private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
     this.route.paramMap.subscribe(() => {
      this.ProductListByCate();
    })
   

  }

  ProductList() {
    this.products = this.productService.getProductsList();
  }

  ProductListByCate() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    }
    else {
      this.handleListProducts();
    }
   }

   handleSearchProducts() {

    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;
    this.products = this.productService.searchProducts(theKeyword);
  }

   handleListProducts(){

    // check if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      // get the "id" param string. convert string to a number using the "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
      this.products = this.productService.getProductsListByCate(this.currentCategoryId);
    }
    else {
      this.products = this.productService.getProductsList();
       if(this.products != null)
      {
        this.isLoaded= false;
      }
    }
  }

  addToCart(theProduct: Product) {
    
    //console.log(`Adding to cart: ${theProduct.name}, ${theProduct.unitPrice}`);
    const theCartItem = new CartItem(theProduct);
    this.cartService.addToCart(theCartItem);
  }

}
