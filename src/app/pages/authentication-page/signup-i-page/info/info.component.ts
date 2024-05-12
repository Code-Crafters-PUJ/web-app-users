import { Component } from '@angular/core';
import { AuthService } from '../../../../services/login-services/auth.service';
import Swal from 'sweetalert2';
import { Account } from '../../../../models/user-models/account';
import { Router } from '@angular/router';
import { PlanService } from '../../../../services/plan-services/plan.service';
import { Plan } from '../../../../models/user-models/plan';


@Component({
  selector: 'app-info',
  standalone: true,
  imports: [],
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent {
  

  constructor(private authService: AuthService, private planService: PlanService, private router: Router) { }

  plan!: Plan;

  ngOnInit(): void {
    this.planService.getPlan().subscribe(plan => {
      if (plan !== null){
        this.plan = plan;
      }
    });
  }

  signUpUser(): void {

    /*this.authService.signup(accountData).then((value) => {
      if (value){
        var jwt = JSON.parse(value).jwt;
        // TO DO: Complete in case of Authentication
        this.handleSuccessfulAuthentication();
      }
      else {
        this.handleFailedAuthentication();
      }
    })*/
    this.router.navigate(['/payment']);
  }

  private handleSuccessfulAuthentication() {
    

    this.router.navigate(['/home/admin']);

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
