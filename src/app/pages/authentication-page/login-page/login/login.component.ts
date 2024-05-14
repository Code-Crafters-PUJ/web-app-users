import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../../../services/login-services/auth.service';
import { StorageService } from '../../../../services/login-services/storage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  constructor(private router: Router, private authService: AuthService, private storageService: StorageService) {

  }

  visible: boolean = true;
  changetype: boolean = true;

  viewpass() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }

  signInUser(email: string, password: string) {
    if (email === "" || password === "") {
      Swal.fire({
        title: 'Uppss algo pasó',
        text: "Por favor, llene todos los campos",
        icon: 'warning',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });

    }
    else {
      this.authService.login(email, password).then((value) => {
        if (value) {
          var jwt = JSON.parse(value).jwt;
          if (jwt === "No Credentials matches the given query." || jwt === "ups! credenciales incorrectas" || jwt === "Campos faltantes" || jwt === "Error en el formato de datos" || jwt === "Usuario no encontrado") {
            this.handleFailedAuthentication();
            this.storageService.getSavedAccount();
          }
          else {
            var role = JSON.parse(value).role;
            var jwt = JSON.parse(value).jwt;
            var id_account = JSON.parse(value).id_account;
            var id_company = JSON.parse(value).id_company

            this.handleSuccessfulAuthentication(role);
            this.storageService.saveAccount(id_account,id_company, role, jwt);
          }
        } else {
          // Autenticación fallida
          this.handleFailedAuthentication();
        }
      });
    }
  }
  private handleSuccessfulAuthentication(role: string) {
    
    Swal.fire({
      title: 'Bienvenido',
      text: "Autenticación exitosa",
      icon: 'success',
      confirmButtonText: 'OK'
    });

    if (role === "Raiz") {
      this.router.navigate(['/home/admin']);

    } else if (role === "HR"){
      this.router.navigate(['/home/payroll']);
    } else if (role === "SALES"){
      this.router.navigate(['/home/sales']);
    } else if (role === "INVENTORY"){
      this.router.navigate(['/home/inventory']);
    } else if (role === "ACCOUNTING"){
      this.router.navigate(['/home/accounting']);
    }

  }
  private handleFailedAuthentication() {
    Swal.fire({
      title: 'Uppss algo pasó',
      text: "Error en los datos ingresados, por favor verifique los campos",
      icon: 'warning',
      confirmButtonText: 'OK'
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
      }
    });
  }
}
