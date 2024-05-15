import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {supplier} from "../../../Models/Inventory/supplier";
import {supplierType} from "../../../Models/Inventory/supplierType";
import {NgForOf} from "@angular/common";
import {SupplierService} from "../../../services/inventory-services/supplier/supplier.service";
import Swal from "sweetalert2";
import {SidebarComponent} from "../../../general/sidebar/sidebar.component";


@Component({
  selector: 'app-create-supplier',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgForOf,
    SidebarComponent
  ],
  templateUrl: './create-supplier.component.html',
  styleUrl: './create-supplier.component.css'
})
export class CreateSupplierComponent implements OnInit {
  companyId = -1;
  newSupplier: supplier = {
    id: null,
    name: '',
    supplierType: '',
    address: '',
    phone: '',
    email: '',
    urlPage: '',
    serviceType: ''
  };
  @Output() supplierDisabled = new EventEmitter<boolean>();

  supplierOptions: { value: supplierType, text: string }[] = [
    {value: supplierType.PERSONA, text: 'Persona'},
    {value: supplierType.EMPRESA, text: 'Empresa'},
    {value: supplierType.ORGANIZACION, text: 'Organización'},
    {value: supplierType.FUNDACION, text: 'Fundación'}
  ];

  constructor(
    private supplierService: SupplierService
  ) {
  }

  ngOnInit(): void {
    this.supplierService.generateSupplierId().subscribe(id => {
      this.newSupplier.id = id;
    });
    //TODO: 'obtain company id from the session'
  }

  disableSupplierComponent() {
    this.supplierDisabled.emit(true); // Emit true to indicate disabling
  }

  createSupplier() {
    if (!this.validateForm()) {
      Swal.fire({
        title: 'Campos incompletos',
        text: "Por favor llena todos los campos",
        icon: 'warning',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          return;
        }
      });
    }
    else {
      if (this.supplierService.createSupplier(this.newSupplier, this.companyId)) {
        Swal.fire({
          title: 'Correcto',
          text: "Proveedor creado exitosamente",
          icon: 'success',
          confirmButtonText: 'OK'
        });
        this.disableSupplierComponent();
      } else {
        Swal.fire({
          title: 'Error',
          text: "Error al crear proveedor",
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    }
  }

  validateForm() {
    //verify if all fields are filled
    return this.newSupplier.name !== '' || this.newSupplier.supplierType !== '' || this.newSupplier.address !== '' || this.newSupplier.phone !== '' || this.newSupplier.email !== '' || this.newSupplier.serviceType !== '';
  }
}
