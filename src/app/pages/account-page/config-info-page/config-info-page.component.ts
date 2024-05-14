import {Component, OnInit} from '@angular/core';
import {SidebarComponent} from '../../../general/sidebar/sidebar.component';
import {AccountService} from "../../../services/account-services/account.service";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import Swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-config-info-page',
  standalone: true,
  imports: [SidebarComponent, FormsModule, NgIf, NgForOf],
  templateUrl: './config-info-page.component.html',
  styleUrl: './config-info-page.component.css'
})
export class ConfigInfoPageComponent implements OnInit {
  companyId = -1;
  company = {
    id: 0,
    NIT: 0,
    name: '',
    businessArea: '',
    employeeNumber: 0,
    planId: 0,
  };

  rootProfile = {
    name: "",
    lastname: "",
    typeCardId: "",
    cardId: "",
    phone: "",
    email: "",
    password: "",
    businessNit: "",
    role: "",
  };
  branches = [
    {
      id: 0,
      address: '',
      name: '',
    }
  ];
  enablePasswordChange: boolean = false;
  pass = {
    newPassword: '',
    confirmPassword: '',
    actualPassword: ''
  }

  constructor(
    private accountService: AccountService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    let companyIdString = localStorage.getItem('id_company');
    if (companyIdString) {
      this.companyId = parseInt(companyIdString);
    }
    //TODO: Remove companyId manual assignment
    this.companyId = 1;
    this.accountService.getRootAccount(this.companyId).subscribe(profile => {
      this.rootProfile = profile;
    });
    this.accountService.getCompanyById(this.companyId).subscribe((company) => {
      this.company = company;
      this.company.id = this.companyId;
    });
    this.accountService.getAllBranchesByCompany(this.companyId).subscribe((branches) => {
      this.branches = branches;
    });

  }


  updateConfigInfo() {
    if (this.validateForm()) {
      this.accountService.updateCompany(this.company).subscribe((response) => {
        if (response) {
          Swal.fire(
            'Información actualizada',
            'La información de la empresa se ha actualizado correctamente',
            'success'
          )
        } else {
          Swal.fire(
            'Error',
            'No se ha podido actualizar la información',
            'error'
          )
        }
      });
      this.accountService.updateRootAccount(this.rootProfile).subscribe((response) => {
        if (response) {
          Swal.fire(
            'Información actualizada',
            'La información del administrador se ha actualizado correctamente',
            'success'
          )
        } else {
          Swal.fire(
            'Error',
            'No se ha podido actualizar la información',
            'error'
          )
        }

      });
      this.accountService.updateBranches(this.branches, this.companyId).subscribe((response) => {
        if (response) {
          Swal.fire(
            'Información actualizada',
            'La información de las sucursales se ha actualizado correctamente',
            'success'
          )
        } else {
          Swal.fire(
            'Error',
            'No se ha podido actualizar la información',
            'error'
          )
        }
      });
      this.accountService.getAllBranchesByCompany(this.companyId).subscribe((branches) => {
        this.branches = branches;
      });

      Swal.fire(
        'Información actualizada',
        'La información se ha actualizado correctamente',
        'success'
      );
      //move to general info page
      this.router.navigate(['home/admin/myaccount']);
    }

  }

  validateForm() {
    return this.validateCompany() && this.validateRootAccount() && this.validateBranches();
  }

  validateCompany() {
    if (this.company.NIT.toString() === '' || this.company.name === '' || this.company.businessArea === '' || this.company.employeeNumber.toString() === '') {
      Swal.fire(
        'Error',
        'Todos los campos de la empresa son requeridos',
        'error'
      );
      return false;
    }
    this.accountService.companyNitExists(this.company.NIT, this.companyId).subscribe((exists) => {
      if (exists) {
        Swal.fire(
          'Error',
          'El NIT ya está registrado',
          'error'
        );
        return false;
      }
      return true;
    });
    return true;
  }

  validateRootAccount() {
    if (this.rootProfile.name === '' || this.rootProfile.lastname === '' || this.rootProfile.typeCardId === '' || this.rootProfile.cardId === '' || this.rootProfile.phone === '' || this.rootProfile.email === '') {
      Swal.fire(
        'Error',
        'Todos los campos del administrador son requeridos',
        'error'
      );
      return false;
    }
    if (!this.validateEmail(this.rootProfile.email)) {
      Swal.fire(
        'Error',
        'El correo electrónico no es válido',
        'error'
      );
      return false;
    }
    return true;
  }

  validateBranches() {

    for (let i = 0; i < this.branches.length; i++) {
      console.log(this.branches[i]);
      if (this.branches[i].name === '' || this.branches[i].address === '') {
        Swal.fire(
          'Error',
          'Todos los campos de las sucursales son requeridos',
          'error'
        );
        return false;
      }
    }
    return true;
  }

  validateEmail(email: string) {
    let re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  changePassword() {
    if (this.pass.newPassword !== this.pass.confirmPassword) {
      Swal.fire(
        'Error',
        'Las contraseñas no coinciden',
        'error'
      );
      return;
    }

    if (this.pass.actualPassword === this.pass.newPassword || this.pass.actualPassword === this.pass.confirmPassword) {
      Swal.fire(
        'Error',
        'La contraseña nueva debe ser diferente a la actual',
        'error'
      );
      return;
    }

    if (this.pass.newPassword.length < 8) {
      Swal.fire(
        'Error',
        'La contraseña debe tener al menos 8 caracteres',
        'error'
      );
      return;
    }

    this.accountService.changePassword(this.companyId, this.pass.newPassword, this.pass.actualPassword).subscribe((response) => {
      if (response) {
        console.log('Password changed1', this.enablePasswordChange);
        this.showPasswordChange();
        console.log('Password changed2', this.enablePasswordChange);
        this.enablePasswordChange = false;
        console.log('Password changed3', this.enablePasswordChange);
        Swal.fire(
          'Contraseña actualizada',
          'La contraseña se ha actualizado correctamente',
          'success'
        ).then(() => {
          // Reset password fields and disable change password section only if successful
          this.pass = {
            newPassword: '',
            confirmPassword: '',
            actualPassword: ''
          };
        });
      } else {
        Swal.fire(
          'Error',
          'La contraseña actual es incorrecta',
          'error'
        );
      }
    });
  }

  showPasswordChange() {
    this.pass = {
      newPassword: '',
      confirmPassword: '',
      actualPassword: ''
    }
    this.enablePasswordChange = !this.enablePasswordChange;
  }


  deleteBranch(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.accountService.deleteBranch(id, this.companyId).subscribe((response) => {
          if (response) {
            Swal.fire(
              'Eliminado',
              'La sucursal ha sido eliminada',
              'success'
            );
            //update branches
            this.accountService.getAllBranchesByCompany(this.companyId).subscribe((branches) => {
              this.branches = branches;
            });
          } else {
            Swal.fire(
              'Error',
              'No se ha podido eliminar la sucursal',
              'error'
            );
          }
        });
      }
    });
  }

  addNewBranch() {
    let newSucursalId = this.accountService.generatebranchId(this.companyId);
    let newBranch = {id: newSucursalId, address: '', name: ''}; // Inicializa la nueva sucursal
    this.branches.push(newBranch); // Agrega la nueva sucursal al arreglo de sucursales
  }
}
