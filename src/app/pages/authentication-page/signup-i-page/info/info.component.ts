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
    

    // Si todas las validaciones pasan, navegar a la página de pago
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

  // VALIDATIONS
  
  private isValidEmail(email: string): boolean {
    // Utilizar una expresión regular para validar el formato del correo electrónico
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  private isValidPhone(phone: string): boolean {
      // Utilizar una expresión regular para validar el formato del teléfono
      const phoneRegex = /^\d{10}$/;
      return phoneRegex.test(phone);
  }

  private isValidPassword(password: string): boolean {
      // Validar que la contraseña tenga al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,}$/;
      return passwordRegex.test(password);
  }

  private isValidBusinessName(businessName: string): boolean {
      // Validar que el nombre del negocio no esté vacío
      return businessName.trim() !== '';
  }

  private isUniqueNIT(nit: string): boolean {
      // Realizar la validación en la base de datos para verificar si el NIT ya está registrado
      // Devolver true si el NIT es único, false si ya está registrado
      return true; // Temporalmente se devuelve true para el ejemplo
  }

  private isValidEmployeeNumber(employeeNumber: string): boolean {
      // Validar que el número de empleados sea un número válido
      const employeeNumberRegex = /^\d+$/;
      return employeeNumberRegex.test(employeeNumber);
  }

}
