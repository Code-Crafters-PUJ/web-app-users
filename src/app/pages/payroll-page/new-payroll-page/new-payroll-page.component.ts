import { Component, OnInit, ViewChild } from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import { Employee } from '../../../models/payroll-models/employee';
import { Payroll } from '../../../models/payroll-models/payroll';
import { PayrollsService } from '../../../services/payroll-services/payrolls.service';
import { ActivatedRoute, Router } from '@angular/router';
import {CurrencyPipe, DatePipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-new-payroll-page',
  templateUrl: './new-payroll-page.component.html',
  styleUrls: ['./new-payroll-page.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    CurrencyPipe,
    DatePipe
  ]
})
export class NewPayrollPageComponent implements OnInit {
  @ViewChild('payrollForm') payrollForm!: NgForm;
  employees: Employee[] = [];
  payroll: Payroll = {
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
  currentPage: number = 1;
  totalPages: number = 1;
  pageSize: number = 10;
  totalIncome: number =0;
  totalDeductions: number =0;
  totalNet: number =0;
  displayedEmployees: Employee[] = [];
  selectedEmployees: {[id: number]: boolean} = {};
  months = [
    { value: 1, name: 'Enero (I)' },
    { value: 2, name: 'Enero (II)' },
    { value: 3, name: 'Febrero (I)' },
    { value: 4, name: 'Febrero (II)' },
    { value: 5, name: 'Marzo (I)' },
    { value: 6, name: 'Marzo (II)' },
    { value: 7, name: 'Abril (I)' },
    { value: 8, name: 'Abril (II)' },
    { value: 9, name: 'Mayo (I)' },
    { value: 10, name: 'Mayo (II)' },
    { value: 11, name: 'Junio (I)' },
    { value: 12, name: 'Junio (II)' },
    { value: 13, name: 'Julio (I)' },
    { value: 14, name: 'Julio (II)' },
    { value: 15, name: 'Agosto (I)' },
    { value: 16, name: 'Agosto (II)' },
    { value: 17, name: 'Septiembre (I)' },
    { value: 18, name: 'Septiembre (II)' },
    { value: 19, name: 'Octubre (I)' },
    { value: 20, name: 'Octubre (II)' },
    { value: 21, name: 'Noviembre (I)' },
    { value: 22, name: 'Noviembre (II)' },
    { value: 23, name: 'Diciembre (I)' },
    { value: 24, name: 'Diciembre (II)' }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private payrollsService: PayrollsService
  ) {}

  ngOnInit(): void {
    this.updateData();
  }

  updateData() {
    this.payrollsService.getEmployees().subscribe({
      next: (employees) => {
        this.employees = employees;
        this.updateDisplayedEmployees();
      },
      error: (error) => {
        console.error('Error al obtener los datos de empleados:', error);
      }
    });
  }

  updateDisplayedEmployees() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedEmployees = this.employees.slice(startIndex, endIndex);
    this.totalPages = Math.ceil(this.employees.length / this.pageSize);
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

  updateURL() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { pagina: this.currentPage, pageSize: this.pageSize },
      queryParamsHandling: 'merge'
    });
  }

  cancelPayroll() {
    this.router.navigate(['/home/payroll/show/all/payrolls']);
  }

  savePayroll() {
    if (!this.payrollForm.valid || !this.isEmployeeSelected()) {
      this.payrollForm.form.markAllAsTouched();
      alert('Por favor complete todos los campos requeridos y seleccione al menos un empleado.');
      return;
    }
    this.payroll.employees = this.employees.filter(e => this.selectedEmployees[e.id]);
    this.payrollsService.addPayroll(this.payroll).subscribe({
      next: () => this.router.navigate(['/home/payroll/show/all/payrolls']),
      error: (error) => console.error('Error al guardar la nómina:', error)
    });
  }

  onSubmit() {
    this.savePayroll();
  }

  updateSelection(employee: Employee) {
    this.selectedEmployees[employee.id] = !this.selectedEmployees[employee.id];
    this.calculateTotal();
  }

  calculateTotal() {
    this.totalNet = this.displayedEmployees
      .filter(emp => this.selectedEmployees[emp.id])
      .reduce((acc, curr) => acc + (curr.contract.length > 0 ? curr.contract[0].totalSalary : 0), 0);
    this.totalDeductions = this.totalNet * 0.08;
    this.totalIncome = this.totalNet + this.totalDeductions;
  }

  isEmployeeSelected(): boolean {
    return Object.values(this.selectedEmployees).some(value => value);
  }
}
