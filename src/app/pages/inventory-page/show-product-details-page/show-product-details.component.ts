import {Component, OnInit} from '@angular/core';
import {CreateProductComponent} from "../create-product-page/create-product.component";
import {product} from "../../../Models/Inventory/product";
import {FormsModule} from "@angular/forms";
import {branch} from "../../../Models/Inventory/branch";
import {NgForOf} from "@angular/common";
import {ProductService} from "../../../services/inventory-services/product/product.service";
import {branchesProductTemplate} from "../../../Models/Inventory/branchesProductTemplate";
import {Router} from "@angular/router";

@Component({
  selector: 'app-show-product-details',
  standalone: true,
  imports: [
    CreateProductComponent,
    FormsModule,
    NgForOf
  ],
  templateUrl: './show-product-details.component.html',
  styleUrl: './show-product-details.component.css'
})

export class ShowProductDetailsComponent implements OnInit {
  branches: branch[] =[];
  product: product = {
    id: 0,
    name: '',
    description: '',
    category: '',
    sellPrice: 0

  };
  branchesProducts: branchesProductTemplate[] = [];
  productId: number = -1;
  total=0;
  constructor(
    private productService: ProductService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    const productIdString = sessionStorage.getItem('productId');
    if (productIdString !== null) {
      this.productId = parseInt(productIdString);
      this.productService.getProductById(this.productId).subscribe(product => {
        this.product = product;
      });
      this.productService.getAllBranchesByProduct(this.productId).subscribe(branches => {
        this.branchesProducts = branches;
      });
    }
    sessionStorage.removeItem('supplierId');
    //get the total of products of all branches
    this.branchesProducts.forEach(branchProduct => {
      this.total += branchProduct.quantity;
    });
  }

  updateProduct(product: product): void {
    this.product = product; // Actualizar el producto
  }

  cancelChanges() {
    this.router.navigate(['home/inventory/show/product/all']);
  }

  deleteProduct(productId: number) {
    this.productService.deleteProduct(productId).subscribe(() => {
      this.router.navigate(['home/inventory/show/product/all']);
    });

  }
}
