import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {supplier} from "../../../Models/Inventory/supplier";
import {supplierType} from "../../../Models/Inventory/supplierType";
import {ActivatedRoute, Router} from "@angular/router";
import {SupplierService} from "../../../services/inventory-services/supplier/supplier.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-show-supplier-details',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './show-supplier-details.component.html',
  styleUrl: './show-supplier-details.component.css'
})
export class ShowSupplierDetailsComponent implements OnInit{
  supplier: supplier ={
    id: null,
    name: '',
    supplierType: '',
    address: '',
    phone: '',
    email: '',
    urlPage: '',
    serviceType: ''
  };
  supplierId: number = -1;
  companyId = -1;

  supplierOptions: { value: supplierType, text: string }[] = [
    {value: supplierType.PERSONA, text: 'Persona'},
    {value: supplierType.EMPRESA, text: 'Empresa'},
    {value: supplierType.ORGANIZACION, text: 'Organización'},
    {value: supplierType.FUNDACION, text: 'Fundación'}
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private supplierService: SupplierService
  ) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.supplierId = parseInt(id, 10);
      }
    });
    this.supplierId = 10;
    if (this.supplierId !== -1) {
      this.supplierService.getSupplierById(this.supplierId, this.companyId).subscribe(supplier => {
        this.supplier = supplier;
      });
    }
  }


  saveSupplierChanges() {
    if(this.validateForm()){
      this.supplierService.editSupplier(this.supplier, this.companyId).subscribe((res) => {
        if (res) {
          Swal.fire(
            'Proveedor actualizado',
            'El proveedor ha sido actualizado exitosamente',
            'success'
          )
          this.router.navigate(['home/inventory/show/supplier/all']);
        } else {
          Swal.fire(
            'Error',
            'No se pudo actualizar el proveedor',
            'error'
          )
        }
      });
    }else{
      Swal.fire(
        'Error',
        'Por favor complete todos los campos',
        'error'
      )
    }

  }

  cancelChanges() {
    this.router.navigate(['home/inventory/show/supplier/all']);
  }

  deleteSupplier() {
    this.supplierService.deleteSupplier(this.supplierId, this.companyId).subscribe((res) => {
      if (res) {
        Swal.fire(
          'Proveedor eliminado',
          'El proveedor ha sido eliminado exitosamente',
          'success'
        )
        this.router.navigate(['home/inventory/show/supplier/all']);
      } else {
        Swal.fire(
          'Error',
          'No se pudo eliminar el proveedor',
          'error'
        )
      }

    });
  }

  private validateForm() {
    return this.supplier?.name !== '' || this.supplier?.address !== '' || this.supplier?.phone !== '' || this.supplier?.email !== '' || this.supplier?.serviceType !== '' || this.supplier?.supplierType !== ''
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
