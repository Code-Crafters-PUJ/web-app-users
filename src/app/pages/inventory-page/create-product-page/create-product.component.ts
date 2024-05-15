import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgForOf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {product} from "../../../models/Inventory/product";
import {branch} from "../../../models/Inventory/branch";
import {ProductService} from "../../../services/inventory-services/product/product.service";
import Swal from "sweetalert2";
import {branchProductInventory} from "../../../models/Inventory/branchProductInventory";
import {branchesProductTemplate} from "../../../models/Inventory/branchesProductTemplate";

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent implements OnInit{
  @Output() productDisabled = new EventEmitter<boolean>();
  branches: branch[] = [];
  branchesNames: string[] = [];
  availableBranches: string[] = [];
  branchesProducts: branchesProductTemplate[] = [];
  newProduct : product = {
    id: 0,
    name: '',
    description: '',
    category: '',
    sellPrice: 0,
  }
  productBranches: branchProductInventory[] = [];
  constructor(
    private productService: ProductService
  ) {

  }

  ngOnInit(): void {
    this.productService.generateproductId().subscribe(id => {
      this.newProduct.id = id;
    });
    this.productService.getAllBranchesNames().subscribe(branches => {
      this.branchesNames = branches;
      this.branchesNames.forEach(branchName => {
        this.branchesProducts.push({
          branchName: branchName,
          discount: 0,
          quantity: 0,
          enabled: false
        });
      });
    });


  }

  createProdcut() {
    if (this.validateForm()){

      //get the branches that are enabled
      const branchesProducts = this.branchesProducts.filter(branch => branch.enabled);
      //Verify that the product has at least one branch
      if (branchesProducts.length == 0){
        Swal.fire({
          title: '¡Error!',
          text: 'Por favor, seleccione al menos una sucursal',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        return;
      }
      this.productService.createProduct(this.newProduct, branchesProducts).subscribe(result => {
        if (result) {
          Swal.fire({
            title: '¡Producto creado!',
            text: 'El producto se ha creado exitosamente',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
          this.disableProductComponent();
          }
        else {
          Swal.fire({
            title: '¡Error!',
            text: 'Ha ocurrido un error al crear el producto',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      });
    }
    else {
      Swal.fire({
        title: '¡Error!',
        text: 'Por favor, complete todos los campos',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  }
  validateForm() {
    if (this.newProduct.name != '' && this.newProduct.description != '' && this.newProduct.category != '' && this.newProduct.sellPrice > 0){
      //verify that all enable branches have a quantity and a discount
      if (this.branchesProducts.filter(branch => branch.enabled).every(branch => branch.quantity >= 0 && branch.discount >= 0)){
        return true;
      }
    }
    return false;
  }

  handleBranchToggle(branchProduct: branchesProductTemplate, index: number) {
    if (branchProduct.enabled) {
      // If the branch is enabled, we don't need confirmation
      return;
    }

    // Display the confirmation alert
    Swal.fire({
      title: 'Desactivar sucursal',
      text: 'Al desactivar, se perderán los cambios realizados para esta sucursal. ¿Estás seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        // If confirmed, disable the branch and reset related data
        branchProduct.enabled = false;
        branchProduct.quantity = 0;
        branchProduct.discount = 0;
      } else {
        // If not confirmed, re-enable the checkbox
        branchProduct.enabled = true;
      }
    });
  }

  disableProductComponent() {
    this.productDisabled.emit(true);
  }

}
