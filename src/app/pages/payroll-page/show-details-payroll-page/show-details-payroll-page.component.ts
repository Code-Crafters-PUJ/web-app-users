import {Component, OnInit, ViewChild} from '@angular/core';
import {CurrencyPipe, DatePipe, NgForOf} from "@angular/common";
import {FormsModule, NgForm} from "@angular/forms";
import {Employee} from "../../../models/payroll-models/employee";
import {Payroll} from "../../../models/payroll-models/payroll";
import {v4 as uuidv4} from "uuid";
import {ActivatedRoute, Router} from "@angular/router";
import {PayrollsService} from "../../../services/payroll-services/payrolls.service";

@Component({
  selector: 'app-show-details-payroll-page',
  standalone: true,
    imports: [
        CurrencyPipe,
        DatePipe,
        FormsModule,
        NgForOf
    ],
  templateUrl: './show-details-payroll-page.component.html',
  styleUrl: './show-details-payroll-page.component.css'
})
export class ShowDetailsPayrollPageComponent implements OnInit {

  currentPage: number = 1;
  totalPages: number = 1;
  pageSize: number = 10;
  displayedEmployees: Employee[] = [];
  payrollId: string | null = '';
  payroll: Payroll = {
    id: uuidv4(),
    state: 'En espera',
    liquidationType: '',
    payrollName: '',
    month: '',
    year: new Date().getFullYear(),
    employees: [],
    totalIncome: 0,
    totalDeductions: 0,
    totalNet: 0
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private payrollsService: PayrollsService
  ) {}

  ngOnInit(): void {
    this.payrollId = this.route.snapshot.paramMap.get('id');
    console.log('Payroll ID:', this.payrollId);  // Verifica que se esté obteniendo un ID válido

    this.payrollsService.getPayrollDetails(this.payrollId).subscribe(data => {
      console.log('Data loaded:', data);  // Verifica que los datos se carguen correctamente
      this.payroll = data;
      this.updateDisplayedEmployees();  // Asegúrate de llamar esto después de cargar los datos
    }, error => {
      console.error('Error fetching payroll details', error);
    });
  }

  updateDisplayedEmployees() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedEmployees = this.payroll.employees.slice(startIndex, endIndex);
    this.totalPages = Math.ceil(this.payroll.employees.length / this.pageSize);
    console.log('Displayed employees:', this.displayedEmployees);  // Verifica qué empleados se están mostrando
  }


  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedEmployees();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedEmployees();
    }
  }




}
