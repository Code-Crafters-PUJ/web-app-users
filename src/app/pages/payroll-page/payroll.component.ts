import { Component } from '@angular/core';
import {ShowPayrollsPageComponent} from "./show-payrolls-page/show-payrolls-page.component";

@Component({
  selector: 'app-payroll',
  standalone: true,
  imports: [
    ShowPayrollsPageComponent
  ],
  templateUrl: './payroll.component.html',
  styleUrl: './payroll.component.css'
})
export class PayrollComponent {

}
