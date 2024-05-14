import { Component } from '@angular/core';
import {ShowPayrollsPageComponent} from "./show-payrolls-page/show-payrolls-page.component";
import {SidebarComponent} from "../../general/sidebar/sidebar.component";

@Component({
  selector: 'app-payroll',
  standalone: true,
  imports: [
    ShowPayrollsPageComponent,
    SidebarComponent
  ],
  templateUrl: './payroll.component.html',
  styleUrl: './payroll.component.css'
})
export class PayrollComponent {

}
