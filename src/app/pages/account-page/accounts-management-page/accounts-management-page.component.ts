import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SidebarComponent} from '../../../general/sidebar/sidebar.component';
import {AccountService} from "../../../services/account-services/account.service";
import {Account} from "../../../models/user-models/account";
import {NgForOf, NgIf} from "@angular/common";
import {Permission} from "../../../Models/user-models/permission";
import {FormsModule} from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: 'app-accounts-management-page',
  standalone: true,
  imports: [SidebarComponent, NgForOf, FormsModule, NgIf],
  templateUrl: './accounts-management-page.component.html',
  styleUrl: './accounts-management-page.component.css'
})
export class AccountsManagementPageComponent {

  companyId: number = -1;
  userId: number = -1;
  account: Account = {
    email: '',
    password: '',

    name: '',
    lastname: '',
    phone: '',
    type_id_card: '',
    id_card: '',
    company_NIT: 0,

    role: ''
  };

  currentPage: number = 1;
  totalPages: number = 1;
  pageSize: number = 10;

  accounts: Account[] = [];
  displayedAccounts: Account[] = [];
  createAccountVisibility: boolean = false;
  editAccountVisibility: boolean = false;
  modules: any[] = [];

  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    let companyString = sessionStorage.getItem('id_company');
    if (companyString) {
      this.companyId = parseInt(companyString);
    }
    let userString = sessionStorage.getItem('id_account');
    if (userString) {
      this.userId = parseInt(userString);
    }
    this.accountService.getAllAccounts(this.companyId).subscribe(
      data => {
        this.accounts = data;
        this.totalPages = Math.ceil(data.length / this.pageSize);
        this.updateData();
      }
    );
    this.accountService.getAllModulesByCompany(this.companyId).subscribe(
      data => {
        this.modules = data.map(module => ({
          name: module.name,
          view: false,
          modify: false
        }));
      }
    );
    this.updateData();
  }

  updateData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.accounts.length);

    this.displayedAccounts = this.accounts.slice(startIndex, endIndex);
  }


  private updateURL() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {pagina: this.currentPage, pageSize: this.pageSize},
      queryParamsHandling: 'merge',
    });
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateURL();
      this.updateData();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateURL();
      this.updateData();
    }
  }

  showCreateAccount() {
    if (this.editAccountVisibility) {
      this.editAccountVisibility = false;
    }
    this.accountService.getTemporalPassword().subscribe((password) => {
      this.account.password = password;
    });
    this.createAccountVisibility = true;
  }

  showEditAccount(idCard: string) {
    let id = parseInt(idCard);
    this.accountService.getAccountById(id).subscribe((account) => {
      this.account = account;
    });
    if (this.createAccountVisibility) {
      this.createAccountVisibility = false;
    }
    this.editAccountVisibility = true;
  }

  createAccount() {
    if (this.validateForm()) {
      this.accountService.createAccount(this.account, this.modules).subscribe(response => {
        if (response) {
          Swal.fire({
            icon: 'success',
            title: '¡Cuenta creada!',
            text: 'La cuenta se ha creado exitosamente',
          })
          this.cancelCreateAccount()
          this.ngOnInit();
        }
      });

    }

  }

  validateForm() {
    if (this.account.email === '' || this.account.name === '' || this.account.lastname === '' || this.account.phone === '' || this.account.type_id_card === '' || this.account.id_card === '' || this.account.role === '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor llene todos los campos',
      })
      return false;
    }
    let regex = /^[0-9]+$/;
    if (!regex.test(this.account.phone)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El campo teléfono solo puede contener números',
      })
      return false;
    }
    let re = /\S+@\S+\.\S+/;
    if (!re.test(this.account.email)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El campo email no es válido',
      })
      return false;
    }
    this.accountService.verifyCardIdExists(this.account.id_card).subscribe((exists) => {
      if (exists) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'El número de identificación ya está registrado',
        })
        return false;
      }
      return true;
    });
    this.accountService.verifyEmailExists(this.account.email).subscribe((exists) => {
      if (exists) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'El correo electrónico ya está registrado',
        })
        return false;
      }
      return true;
    });
    return true;
  }

  togglePermission(permission: any, type: string) {
    if (type === 'view') {
      if (permission.view) {
        permission.modify = false;
      }
    } else if (type === 'modify') {
      if (permission.modify) {
        permission.view = false;
      }
    }
  }

  cancelCreateAccount() {
    this.createAccountVisibility = false;
    this.account = {
      email: '',
      password: '',

      name: '',
      lastname: '',
      phone: '',
      type_id_card: '',
      id_card: '',
      company_NIT: 0,

      role: ''
    }
  }

  updateAccount() {
    if(this.validateEditForm()){

      this.accountService.updateAccount(this.account, this.modules).subscribe(response => {
        if (response) {
          Swal.fire({
            icon: 'success',
            title: '¡Cuenta actualizada!',
            text: 'La cuenta se ha actualizado exitosamente',
          })
          this.cancelUpdateAccount()
          this.ngOnInit();
        }
      });
    }
  }

  validateEditForm() {
    if (this.account.email === '' || this.account.name === '' || this.account.lastname === '' || this.account.phone === '' || this.account.type_id_card === '' || this.account.id_card === '' || this.account.role === '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor llene todos los campos',
      })
      return false;
    }
    let regex = /^[0-9]+$/;
    if (!regex.test(this.account.phone)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El campo teléfono solo puede contener números',
      })
      return false;
    }
    let re = /\S+@\S+\.\S+/;
    if (!re.test(this.account.email)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El campo email no es válido',
      })
      return false;
    }
    this.accountService.verifyCardIdExistsOnEdit(this.account.id_card, this.userId).subscribe((exists) => {
      if (exists) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'El número de identificación ya está registrado',
        })
        return false;
      }
      return true;
    });
    this.accountService.verifyEmailExistsOnEdit(this.account.email, this.userId).subscribe((exists) => {
      if (exists) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'El correo electrónico ya está registrado',
        })
        return false;
      }
      return true;
    });
    return true;
  }

  cancelUpdateAccount() {
    this.editAccountVisibility = false;
    this.account = {
      email: '',
      password: '',

      name: '',
      lastname: '',
      phone: '',
      type_id_card: '',
      id_card: '',
      company_NIT: 0,

      role: ''
    }
  }

  deleteAccount() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.accountService.deleteAccount(this.account.id_card).subscribe(response => {
          if (response) {
            Swal.fire(
              '¡Eliminado!',
              'La cuenta ha sido eliminada.',
              'success'
            )
            this.cancelUpdateAccount()
            this.ngOnInit();
          }
        });
      }
    });
    }
}

