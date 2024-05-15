import {Component, OnInit} from '@angular/core';
import {CreateProductComponent} from "../create-product-page/create-product.component";
import {product} from "../../../models/Inventory/product";
import {FormsModule} from "@angular/forms";
import {branch} from "../../../models/Inventory/branch";
import {NgForOf} from "@angular/common";
import {ProductService} from "../../../services/inventory-services/product/product.service";
import {branchesProductTemplate} from "../../../Models/Inventory/branchesProductTemplate";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {SidebarComponent} from "../../../general/sidebar/sidebar.component";
import {SupplierService} from "../../../services/inventory-services/supplier/supplier.service";

@Component({
  selector: 'app-show-product-details',
  standalone: true,
  imports: [
    CreateProductComponent,
    FormsModule,
    NgForOf,
    SidebarComponent
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
    private supplierService: SupplierService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    //Get the product id from the session storage
    const productIdString = sessionStorage.getItem('productId');
    if (productIdString !== null) {
      this.productId = parseInt(productIdString);
      this.supplierService.getProductById(this.productId).subscribe((product) => {
        this.product = product;
      });

      //Get all branches and set them enabled or disabled depending if they have the product
      this.supplierService.getAllBranchesByCompany(1).subscribe((allBranches) => {
        this.supplierService.getAllBranchesByProduct(this.productId).subscribe((productBranches) => {
          //Create a map of branches with products
          const productBranchNames = productBranches.map((b) => b.branchName);
          // Start all branches, but only enable those that have the product
          this.branchesProducts = allBranches.map((branch) => {
            const enabled = productBranchNames.includes(branch.name);
            return {
              branchName: branch.name,
              discount: enabled ? productBranches.find(b => b.branchName === branch.name)?.discount ?? 0 : 0,
              quantity: enabled ? productBranches.find(b => b.branchName === branch.name)?.quantity ?? 0 : 0,
              enabled,
            };
          });
        });
      });
    }

    this.updateTotalProducts();
  }
  validateForm() {
    if (this.product.name != '' && this.product.description != '' && this.product.category != '' && this.product.sellPrice > 0){
      //verify that all enable branches have a quantity and a discount
      if (this.branchesProducts.filter(branch => branch.enabled).every(branch => branch.quantity >= 0 && branch.discount >= 0)){
        return true;
      }
    }
    return false;
  }

  updateProduct(product: product): void {
    this.product = product;
    this.updateTotalProducts()
    if (this.validateForm()) {
      //get the branches that are enabled
      const enabledBranches = this.branchesProducts.filter(branchProduct => branchProduct.enabled);
      //Verify that the product has at least one branch
      if (enabledBranches.length === 0) {
        Swal.fire({
          title: 'Error',
          text: 'El producto debe estar disponible en al menos una sucursal',
          icon: 'error'
        });
        return;
      }
      this.supplierService.updateProduct(product, enabledBranches).subscribe(result => {
        if (result) {
          Swal.fire({
            title: 'Producto actualizado',
            text: 'El producto se ha actualizado correctamente',
            icon: 'success'
          });
          this.cancelChanges();
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Ha ocurrido un error al actualizar el producto',
            icon: 'error'
          });
        }

      });
    }

    this.cancelChanges()
  }

  cancelChanges() {
    this.router.navigate(['home/inventory/show/product/all']);
  }

  deleteProduct(productId: number) {
    this.supplierService.deleteProduct(productId).subscribe(() => {
      this.router.navigate(['home/inventory/show/product/all']);
    });

  }
  updateTotalProducts(){
    this.total = this.branchesProducts.reduce((acc, branchProduct) => acc + branchProduct.quantity, 0);
  }

  handleBranchToggle(branchProduct: branchesProductTemplate, index: number) {
    if (branchProduct.enabled) {
      //If the branch is enabled, we don't need confirmation
      return;
    }

    //Show the confirmation alert
    Swal.fire({
      title: 'Desactivar sucursal',
      text: 'Al desactivar, se perderán los cambios realizados para esta sucursal. ¿Estás seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        //If confirmed, reset the quantity and discount
        branchProduct.enabled = false;
        branchProduct.quantity = 0;
        branchProduct.discount = 0;
        this.updateTotalProducts();

      } else {
        // If not confirmed, re-enable the checkbox
        branchProduct.enabled = true;
      }
    });
  }
}
