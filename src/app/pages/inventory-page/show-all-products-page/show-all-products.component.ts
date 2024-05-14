import {Component, OnInit} from '@angular/core';
import {SidebarComponent} from "../../../general/sidebar/sidebar.component";
import {CreateProductComponent} from "../create-product-page/create-product.component";
import {NgForOf, NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {ProductService} from "../../../services/inventory-services/product/product.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {branch} from "../../../Models/Inventory/branch";
import {SupplierService} from "../../../services/inventory-services/supplier/supplier.service";
import {branchesProductTemplate} from "../../../Models/Inventory/branchesProductTemplate";
import {order} from "../../../Models/Inventory/order";
import Swal from "sweetalert2";
import {branchOrder} from "../../../Models/Inventory/branchOrder";

@Component({
  selector: 'app-show-all-products',
  standalone: true,
  imports: [
    SidebarComponent,
    CreateProductComponent,
    NgIf,
    NgForOf,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './show-all-products.component.html',
  styleUrl: './show-all-products.component.css'
})
export class ShowAllProductsComponent implements OnInit{
  protected readonly Math = Math;
  companyId: number = -1 ;
  branches: branch[] = [];
  showProductRegister: boolean = false;
  showProductbuy: boolean = false;
  branchesProducts: branchesProductTemplate[] = [];
  pagination: { [branchName: string]: { currentPage: number, pageSize: number, totalItems: number, totalPages:number } } = {};
  branchesNames: string[] = [];
  supplierOptions:string[] = [];
  sucursalOrder: branchOrder[] = [];
  orderProducts: any[] = [];
  productOptions: string[] = [];
  productOrder: order = {
    productName: '',
    supplierName: '',
    costPrice: 0,
    branchOrders: [],
    purchaseDate: new Date()

  };
  total: number = 0;
  searchText = '';

  constructor(
    private productService: ProductService,
    private supplierService: SupplierService,
    private router: Router
  ) {

  }

  ngOnInit(): void {

    const companyIdStr = sessionStorage.getItem('companyId');
    this.companyId = companyIdStr !== null ? parseInt(companyIdStr) : -1;
    this.productService.getAllBranchesByCompany(this.companyId).subscribe(branches => {
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
      const totalPages = Math.ceil(
        this.pagination[branchName].totalItems /
        this.pagination[branchName].pageSize
      );

      this.pagination[branchName].currentPage = Math.max(
        1,
        Math.min(totalPages, currentPage + direction)
      );
    }
  }

  filterProducts() {
    const searchLower = this.searchText.toLowerCase();
    this.branches.forEach((branch) => {
      branch.products = branch.products.filter((product) =>
        product.product.name.toLowerCase().includes(searchLower)
      );
    });
  }

  onSearchChange() {
    this.filterProducts();
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

  haandleProductDisabled(disabled: boolean) {
    //If the component is disabled, hide the product registration form
    this.showProductRegister = !disabled;

    // If the component is disabled, reload or update information
    if (disabled) {
      // Reload branches or product information
      this.productService.getAllBranchesByCompany(this.companyId).subscribe((branches) => {
        this.branches = branches;
        this.initializePagination();
      });
    }
  }


  enablebuy() {
    this.supplierService.getAllSuppliersByCompany(this.companyId).subscribe((suppliers) => {
      this.supplierOptions = suppliers.map(supplier => supplier.name);
    });
    this.productService.getAllProductsByCompany(this.companyId).subscribe((products) => {
      this.productOptions = products.map(product => product.name);
    });
    this.productService.getAllBranchesNamesByCompany(this.companyId).subscribe(branches => {
      this.branchesNames = branches;
      this.branchesNames.forEach(branchName => {
        this.sucursalOrder.push({
          branchName: branchName,
          quantity: 0,
          enabled: false
        });
      });
    });
    this.showProductbuy = true;

  }

  handleBranchToggle(sucursalOrder: branchOrder, index: number) {
    if (sucursalOrder.enabled) {
      // If the branch is enabled, we don't need confirmation
      return;
    }
    // Display the confirmation alert
    Swal.fire({
      title: 'Borrar sucursal del pedido',
      text: 'Al desactivar, se perderán los cambios realizados para esta sucursal. ¿Estás seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        // If confirmed, disable the branch and reset related data
        sucursalOrder.enabled = false;
        sucursalOrder.quantity = 0;
        this.updateTotalProducts();
      } else {
        // If not confirmed, re-enable the checkbox
        sucursalOrder.enabled = true;
      }
    });
  }

  sendOrder(){
    if(this.validateOrder()){
      this.productOrder.branchOrders = this.sucursalOrder.filter(branchOrder => branchOrder.enabled);
      this.productService.sendOrder(this.companyId, this.productOrder).subscribe((result) => {
        if (result){
          Swal.fire({
            title: '¡Éxito!',
            text: 'El pedido ha sido enviado con éxito',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
          this.cancelOrder();
        }
        else {
          Swal.fire({
            title: '¡Error!',
            text: 'Ha ocurrido un error al enviar el pedido',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }

      });
    }

  }

  validateOrder(){

    if (this.productOrder.productName === '' || this.productOrder.supplierName === '' || this.productOrder.costPrice <= 0 ||this.productOrder.purchaseDate.toString().length > 10){
      Swal.fire({
        title: '¡Error!',
        text: 'Por favor, completa todos los campos',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return false;
    }
      for (let branchOrder of this.sucursalOrder) {
        if (branchOrder.enabled && branchOrder.quantity <= 0) {
          Swal.fire({
            title: '¡Error!',
            text: 'la cantidad de productos debe ser mayor a 0',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
          return false;
        }
      }
    if(this.sucursalOrder.filter(branchOrder => branchOrder.enabled).length === 0) {
      Swal.fire({
        title: '¡Error!',
        text: 'Por favor, selecciona al menos una sucursal',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return false;
    }
    return true;

  }


  updateTotalProducts() {
    this.sucursalOrder.forEach(branchOrder => {
      if (branchOrder.enabled) {
        this.total += branchOrder.quantity* this.productOrder.costPrice;
      }
    });

  }

  cancelOrder() {
    this.showProductbuy = false;
  }
}
