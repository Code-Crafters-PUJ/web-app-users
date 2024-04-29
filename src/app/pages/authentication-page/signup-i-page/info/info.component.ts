import { Component } from '@angular/core';
import { AuthService } from '../../../../services/login-services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-info',
  standalone: true,
  imports: [],
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent {

  constructor(private authService: AuthService) { }

  signUpUser(accountData: any): void {

    this.authService.signup(accountData).then((value) => {
      if (value){
        var jwt = JSON.parse(value).jwt;
        // TO DO: Complete in case of Authentication
      }
      else {
        this.handleFailedAuthentication();
      }
    })
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
