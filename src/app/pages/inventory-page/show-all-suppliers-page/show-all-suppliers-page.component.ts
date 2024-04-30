import {Component, OnInit} from '@angular/core';
import {CreateSupplierComponent} from "../create-supplier-page/create-supplier.component";
import {NgForOf, NgIf} from "@angular/common";
import {SupplierService} from "../../../services/inventory-services/supplier/supplier.service";
import {Router} from "@angular/router";
import {supplier} from "../../../Models/Inventory/supplier";
import {supplierType} from "../../../Models/Inventory/supplierType";

@Component({
  selector: 'app-show-all-suppliers-page',
  standalone: true,
  imports: [
    CreateSupplierComponent,
    NgIf,
    NgForOf
  ],
  templateUrl: './show-all-suppliers-page.component.html',
  styleUrl: './show-all-suppliers-page.component.css'
})
export class ShowAllSuppliersPageComponent implements OnInit{
  companyId = -1;
  showSupplierComponent: boolean = false;
  allSuppliers: supplier[] = [];
  currentPage = 1;
  pageSize = 10;
  paginatedSuppliers: supplier[] = [];
  totalPages = 0;

  constructor(
    private supplierService: SupplierService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.companyId = 1;
    this.supplierService.getAllSuppliersByCompany(this.companyId).subscribe(suppliers => {
      this.allSuppliers = suppliers;
      this.totalPages = Math.ceil(this.allSuppliers.length / this.pageSize);
      this.updatePaginatedSuppliers();
    });
  }

  enableSupplierComponent() {
    this.showSupplierComponent = true;

  }
  handleSupplierDisabled(disabled: boolean) {
    this.showSupplierComponent = !disabled;
    //update the suppliers
    this.supplierService.getAllSuppliersByCompany(this.companyId).subscribe(suppliers => {
      this.allSuppliers = suppliers;
      this.totalPages = Math.ceil(this.allSuppliers.length / this.pageSize);
      this.updatePaginatedSuppliers();
    });
  }

  supplierDetails(id: number | null){
    if (id == null) {
      return;
    }
    this.saveSupplierId(id);
    this.router.navigate(['home/inventory/show/supplier/detail']);
  }
  saveSupplierId(id: number): void {
    const supplierId: string = id.toString();
    sessionStorage.setItem('supplierId', supplierId);
  }

  updatePaginatedSuppliers(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedSuppliers = this.allSuppliers.slice(start, end);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedSuppliers();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedSuppliers();
    }
  }

  getSupplierTypeName(typeId: string): string {
    switch (typeId) {
      case '1':
        return supplierType.PERSONA;
      case '2':
        return supplierType.EMPRESA;
      case '3':
        return supplierType.ORGANIZACION;
      case '4':
        return supplierType.FUNDACION;
      default:
        return 'Desconocido';
    }
  }


}
