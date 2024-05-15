import { Component } from '@angular/core';
import { AuthService } from '../../../../services/login-services/auth.service';
import Swal from 'sweetalert2';
import { Account } from '../../../../models/user-models/account';
import { Router } from '@angular/router';
import { PlanService } from '../../../../services/plan-services/plan.service';
import { Plan } from '../../../../models/user-models/plan';
import { FormsModule, NgForm } from '@angular/forms';
import { CurrencyPipe, NgIf } from '@angular/common';
import { DataService } from '../../../../services/login-services/data.service';
import { Company } from '../../../../models/user-models/company';


@Component({
  selector: 'app-info',
  standalone: true,
  imports: [FormsModule,
    CurrencyPipe,
    NgIf],
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent {
  
  

  constructor(private authService: AuthService,private dataService: DataService, private planService: PlanService, private router: Router) { }

  plan!: Plan;
  data!: any;
  
  ngOnInit(): void {

    this.obtainService();

  }

  signUpUser(): void {
    let isValid = true;

    this.data = this.obtainData();

    if (!this.isValidEmail(this.data.RootAccountEmail)) {
      // Invalid email
      this.showValidationError('Correo electrónico inválido');
      isValid = false;
    }
    if (!this.isValidPhone(this.data.RootAccountPhone)) {
      // Invalid phone number
      this.showValidationError('Teléfono celular inválido');
      isValid = false;
    }
    if (!this.isValidPassword(this.data.RootAccountPassword)) {
      // Invalid password
      this.showValidationError('Contraseña inválida. Debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número');
      isValid = false;
    }
    if (!this.isValidBusinessName(this.data.RootAccountBusinessName)) {
      // Invalid business name
      this.showValidationError('Nombre de negocio inválido');
      isValid = false;
    }
    if (!this.isValidEmployeeNumber(this.data.RootAccountEmployeeNumber)) {
      // Invalid employee number
      this.showValidationError('Número de empleados inválido');
      isValid = false;
    }

    if (isValid) {
      // All validations passed, continue with sign up
      this.handleSuccessfulAuthentication();
    }else {
      //this.handleFailedAuthentication();
    }
  }

  private showValidationError(message: string): void {
    Swal.fire({
        title: 'Uppss algo pasó',
        text: message,
        icon: 'warning',
        confirmButtonText: 'OK'
    });
  }

  private handleSuccessfulAuthentication() {
    
    // Extract relevant fields for companyData
    const companyData: Company = {
      NIT: this.data.RootAccountNIT,
      name: this.data.RootAccountBusinessName,
      businessArea: this.data.RootAccountBusinessArea,
      employeeNumber: parseInt(this.data.RootAccountEmployeeNumber, 10)
    };

    // Extract relevant fields for accountData
    const accountData: Account = {
      email: this.data.RootAccountEmail,
      password: this.data.RootAccountPassword,
      name: this.data.RootAccountName,
      lastname: this.data.RootAccountLastName,
      phone: this.data.RootAccountPhone,
      type_id_card: this.data.RootAccountType,
      id_card: this.data.RootAccountIdCard,
      company_NIT: this.data.RootAccountNIT,
      role: 'Manager'
    };

    // Save data in DataService
    this.dataService.setCompany(companyData);
    this.dataService.setAccount(accountData);

    this.dataService.setPlan(this.plan);
    this.router.navigate(['/payment']);

  }

  private handleFailedAuthentication() {
    Swal.fire({
      title: 'Uppss algo pasó',
      text: "Error en los datos ingresados, por favor verifique los campos",
      icon: 'warning',
      confirmButtonText: 'OK'
    })
  }

  // VALIDATIONS
  
  private isValidEmail(email: string): boolean {
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);

  }

  private isValidPhone(phone: string): boolean {
      
      const phoneRegex = /^\d{10}$/;
      return phoneRegex.test(phone);
  }

  private isValidPassword(password: string): boolean {
      
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,}$/;
      return passwordRegex.test(password);

  }

  private isValidBusinessName(businessName: string): boolean {
      
      return businessName.trim() !== '';

  }

  // TODO
  
  private isUniqueNIT(nit: string): boolean {

      return true;
  }

  private isValidEmployeeNumber(employeeNumber: string): boolean {
      
      const employeeNumberRegex = /^\d+$/;
      return employeeNumberRegex.test(employeeNumber);

  }

  // GET

  private obtainService(){

    this.planService.getPlan().subscribe(plan => {

      if (plan !== null){
        this.plan = plan;
        
        localStorage.setItem('plan', JSON.stringify(plan));
      }
      
    });

  }

  private obtainData() {
    const formData = new FormData(document.querySelector('form')!);
    const data: { [key: string]: any } = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    return data;
  }

}
