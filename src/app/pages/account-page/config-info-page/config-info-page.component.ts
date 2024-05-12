import {Component, OnInit} from '@angular/core';
import {SidebarComponent} from '../../../general/sidebar/sidebar.component';
import {AccountService} from "../../../services/account-services/account.service";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import Swal from "sweetalert2";

@Component({
  selector: 'app-config-info-page',
  standalone: true,
  imports: [SidebarComponent, FormsModule, NgIf],
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
    electronicPayroll: 0,
    electronicBill: 0,
    planId: 0,
  };

  rootProfile = {
    name: "",
    lastname: "",
    phone: "",
    email: "",
    password: "",
    businessNit: "",
    role: "",
  };
  branches = [];
  enablePasswordChange: boolean = false;
  pass = {
    newPassword: '',
    confirmPassword: '',
    actualPassword: ''
  }

  constructor(
    private accountService: AccountService
  ) {
  }

  ngOnInit(): void {
    let companyIdString = localStorage.getItem('companyid');
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
    });
    this.accountService.getAllBranchesByCompany(this.companyId).subscribe((branches) => {
      this.branches = branches;
    });

  }


  updateConfigInfo() {
    /*
    if(validateForm()){
      this.accountService.updateCompany(this.company).subscribe((response) => {
        if(response){
          Swal.fire(
            'Información actualizada',
            'La información de la empresa se ha actualizado correctamente',
            'success'
          )
        }else{
          Swal.fire(
            'Error',
            'No se ha podido actualizar la información',
            'error'
          )
        }
      });
      this.accountService.updateRootAccount(this.rootProfile).subscribe((response) => {
        if(response){
          Swal.fire(
            'Información actualizada',
            'La información del administrador se ha actualizado correctamente',
            'success'
          )
        }else{
          Swal.fire(
            'Error',
            'No se ha podido actualizar la información',
            'error'
          )
        }

      });
      this.updateBranches().subscribe((response) => {
        if(response){
          Swal.fire(
            'Información actualizada',
            'La información de las sucursales se ha actualizado correctamente',
            'success'
          )
        }else{
          Swal.fire(
            'Error',
            'No se ha podido actualizar la información',
            'error'
          )
        }
      });

    }
*/
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


}
