import {Component, OnInit} from '@angular/core';
import {SidebarComponent} from "../../../general/sidebar/sidebar.component";
import {CreateProductComponent} from "../create-product-page/create-product.component";
import {NgForOf, NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {ProductService} from "../../../services/inventory-services/product/product.service";
import {ReactiveFormsModule} from "@angular/forms";
import {branch} from "../../../Models/Inventory/branch";

@Component({
  selector: 'app-show-all-products',
  standalone: true,
  imports: [
    SidebarComponent,
    CreateProductComponent,
    NgIf,
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './show-all-products.component.html',
  styleUrl: './show-all-products.component.css'
})
export class ShowAllProductsComponent implements OnInit{
  protected readonly Math = Math;
  branches: branch[] = [];
  showProductRegister: boolean = false;
  showProductbuy: boolean = false;
  pagination: { [branchName: string]: { currentPage: number, pageSize: number, totalItems: number, totalPages:number } } = {};
  constructor(
    private productService: ProductService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.productService.getAllBranchesByCompany(1).subscribe(branches => {
      this.branches = branches;
      this.initializePagination();
    });
  }

  initializePagination() {
    this.pagination = {};
    for (const branch of this.branches) {
      this.pagination[branch.name] = { currentPage: 1, pageSize: 10, totalItems: branch.products.length , totalPages: Math.ceil(branch.products.length / 10)};
    }
  }

  changePage(branchName: string, direction: number) {
    if (this.pagination[branchName]) {
      const currentPage = this.pagination[branchName].currentPage;
      const totalPages = Math.ceil(this.pagination[branchName].totalItems / this.pagination[branchName].pageSize);

      this.pagination[branchName].currentPage = Math.max(1, Math.min(totalPages, currentPage + direction));
    }
  }

  productDetails(id: number | null){
    this.saveProduct(id);
    this.router.navigate(['home/inventory/show/product/detail']);
  }
  saveProduct(id: number | null) {
    if (id === null) {
      return;
    }
    sessionStorage.setItem('productId', id.toString());
  }

  enableProductRegistrer() {
    this.showProductRegister = true;

  }

  enablebuy() {
    this.showProductbuy = true;

  }

  haandleProductDisabled(disabled: boolean) {
    //If the component is disabled, hide the product registration form
    this.showProductRegister = !disabled;

    // If the component is disabled, reload or update information
    if (disabled) {
      // Reload branches or product information
      this.productService.getAllBranchesByCompany(1).subscribe((branches) => {
        this.branches = branches;
        this.initializePagination();
      });
    }
  }
}
