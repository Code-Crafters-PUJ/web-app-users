import { Component } from '@angular/core';
import { ActualPlanComponent } from './actual-plan/actual-plan.component';
import { HistoricComponent } from './historic/historic.component';

@Component({
  selector: 'app-config-payment-page',
  standalone: true,
  imports: [ActualPlanComponent,HistoricComponent],
  templateUrl: './config-payment-page.component.html',
  styleUrl: './config-payment-page.component.css'
})
export class ConfigPaymentPageComponent {

}
