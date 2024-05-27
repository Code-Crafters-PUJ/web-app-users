import { Component } from '@angular/core';
import { AuthService } from '../../../../services/login-services/auth.service';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/login-services/data.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, CurrencyPipe, NgIf } from '@angular/common';
import { Plan } from '../../../../models/user-models/plan';
import Swal from 'sweetalert2';
import { SubscriptionBilling } from '../../../../models/user-models/subscriptionBilling';
import { PaymentMethod } from '../../../../models/user-models/paymentMethod';
import { AccountService } from '../../../../services/account-services/account.service';

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
  paymentMethods: PaymentMethod[] = [];
  
  constructor(private authService: AuthService, private router: Router, private dataService: DataService, private accountService: AccountService) { }

  ngOnInit(): void {

    this.obtainService();
    this.loadPaymentMethods();

  }
  obtainService() {

    this.company = this.dataService.getCompany();
    this.account = this.dataService.getAccount();
    this.plan = this.dataService.getPlan();
    
  }

  loadPaymentMethods() {
    this.accountService.getAllPMethods().subscribe((methods: PaymentMethod[]) => {
      this.paymentMethods = methods;
    });
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

      console.log(this.account);
      console.log(this.company);
      this.bill = this.buildBill()
      
      console.log(this.bill);
  
      this.authService.signup(this.account, this.company, this.bill);
      this.router.navigate(['/login']);
      
  }

  private buildBill(): SubscriptionBilling {
    let finalDate: Date = new Date();
    let amount: number = 0;

    if (this.data.SubPlanType === "Anual") {
        finalDate.setFullYear(finalDate.getFullYear() + 1);
        amount = this.plan.anual_price;
    } else if (this.data.SubPlanType === "Semestral") {
        finalDate.setMonth(finalDate.getMonth() + 6);
        amount = this.plan.semestral_price;
    } else if (this.data.SubPlanType === "Mensual") {
        finalDate.setMonth(finalDate.getMonth() + 1);
        amount = this.plan.mensual_price;
    }

    const bill: SubscriptionBilling = {
      initial_date: new Date(),
      final_date: finalDate,
      amount: amount,
      active: true,
      payment_date: new Date(),
      payment_method: this.data.paymentMethod,
      plan: this.plan.id,
      coupon: this.data.coupon || ""
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
    
    console.log(data);
    
    return data;
  }

  private isValidData(){

    if(!this.data['acceptTerms']){
      return false
    }

    if(this.data['paymentMethod'] === ''){
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

    return true
  }

}
