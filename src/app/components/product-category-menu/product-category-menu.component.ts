import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit {

  productCategories: Observable<ProductCategory[]>;

  procate: ProductCategory[]=[];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {

    this.listProductCategories();

  }
  listProductCategories(){
    this.productCategories = this.productService.getProductsCategoryMenu();
  }

}
