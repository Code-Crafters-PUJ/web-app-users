import { Component } from '@angular/core';
import { AuthService } from '../../../../services/login-services/auth.service';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/login-services/data.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, CurrencyPipe, NgIf } from '@angular/common';
import { Plan } from '../../../../models/user-models/plan';

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
    let isValid = true;
    this.data = this.obtainData();
    console.log(this.data);
    
  }

  private handleSuccessfulAuthentication() {

  }

  private handleFailedAuthentication() {

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

}
