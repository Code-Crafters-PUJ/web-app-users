import { Component } from '@angular/core';
import { AuthService } from '../../../../services/login-services/auth.service';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/login-services/data.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, CurrencyPipe, NgIf } from '@angular/common';
import { Plan } from '../../../../models/user-models/plan';
import Swal from 'sweetalert2';
import { SubscriptionBilling } from '../../../../models/user-models/subscriptionBilling';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [FormsModule,
    CurrencyPipe,
    NgIf,
    CommonModule],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent {

  data!: any;
  company!: any;
  account!: any;
  plan!: any;
  bill!: any;

  metodosPago: string[] = ['VISA', 'MasterCard', 'American Express', 'PSE', 'Dinners Club', 'Paypal', 'Efecty'];
  
  constructor(private authService: AuthService, private router: Router, private dataService: DataService) { }

  ngOnInit(): void {

    this.obtainService();

  }
  obtainService() {

    this.company = this.dataService.getCompany();
    this.account = this.dataService.getAccount();
    this.plan = this.dataService.getPlan();
    

  }

  continue(): void {

    this.data = this.obtainData();
    console.log(this.data);

    if (this.isValidData()){
      this.handleSuccessfulAuthentication();
    } else{
      this.handleFailedAuthentication();
    }
    
  }

  private handleSuccessfulAuthentication() {

      Swal.fire({
        title: 'Bienvenido',
        text: "Autenticación exitosa",
        icon: 'success',
        confirmButtonText: 'OK'
      });

      this.authService.signup(this.account);
      this.authService.createCompany(this.company);
      this.bill = this.buildBill();
      this.authService.registerPayment(this.bill);
      this.router.navigate(['/login']);
      
  }

  private buildBill(): SubscriptionBilling {
    let finalDate: Date = new Date();
    let amount: number = 0;

    if (this.data.SubPlanType === "Anual") {
        finalDate = new Date(this.bill.final_date);
        finalDate.setFullYear(finalDate.getFullYear() + 1);
        amount = this.plan.anual_price;
    } else if (this.data.SubPlanType === "Semestral") {
        finalDate = new Date(this.bill.final_date);
        finalDate.setMonth(finalDate.getMonth() + 6);
        amount = this.plan.semestral_price;
    } else if (this.data.SubPlanType === "Mensual") {
        finalDate = new Date(this.bill.final_date);
        finalDate.setMonth(finalDate.getMonth() + 1);
        amount = this.plan.mensual_price;
    }

    const bill: SubscriptionBilling = {
        id: 1,
        initial_date: new Date(),
        final_date: finalDate,
        amount: amount,
        active: true,
        payment_date: new Date(),
        payment_method: this.data.paymentMethod,
        plan: this.plan.id
    };
    return bill;
  }

  private handleFailedAuthentication() {
    Swal.fire({
      title: 'Uppss algo pasó',
      text: "Error en los datos ingresados, por favor verifique los campos",
      icon: 'warning',
      confirmButtonText: 'OK'
    })
  }

  private obtainData() {
    const formData = new FormData(document.querySelector('form')!);
    const data: { [key: string]: any } = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    const metodoPagoSeleccionado = formData.get('paymentMethod');
    if (metodoPagoSeleccionado) {
        data['paymentMethod'] = metodoPagoSeleccionado;
    } else {

        data['paymentMethod'] = '';
    }

    const acceptTerms = formData.get('acceptTerms');
    data['acceptTerms'] = acceptTerms === 'on';

    return data;
  }

  private isValidData(){

    if(!this.data['acceptTerms']){
      return false
    }

    if(this.data['paymentMethod'] === ''){
      return false
    }

    if(this.data['coupon'] === ''){
      return false
    }

    if(this.data['nameMain'] === ''){
      return false
    }
    
    if(this.data['dateExp'] === ''){
      return false
    }

    const currentDate = new Date();
    const expirationDate = new Date(this.data['dateExp']);
    if (expirationDate < currentDate) {
      return false;
    }

    this.authService.isValidCoupon(this.data['coupon']).then((value) => {
      if (!value) {
        return false;
      } 
      return true;
    }).catch((error) => {
      console.error('Error al validar el cupón:', error);
      return false;
    });

    return true
  }

}
