import {Component, OnInit} from '@angular/core';
import {Employee} from "../../../models/payroll-models/employee";
import {Payroll} from "../../../models/payroll-models/payroll";
import {v4 as uuidv4} from "uuid";
import {ActivatedRoute, Router} from "@angular/router";
import {PayrollsService} from "../../../services/payroll-services/payrolls.service";
import {CurrencyPipe, DatePipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-show-employees-page',
  standalone: true,
  imports: [
    CurrencyPipe,
    DatePipe,
    NgForOf
  ],
  templateUrl: './show-employees-page.component.html',
  styleUrl: './show-employees-page.component.css'
})
export class ShowEmployeesPageComponent implements OnInit {

  currentPage: number = 1;
  totalPages: number = 1;
  pageSize: number = 10;
  employee: Employee[] = [];
  displayedEmployees: Employee[] = [];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private payrollsService: PayrollsService
  ) {}


  ngOnInit(): void {

    this.payrollsService.getEmployees().subscribe(data => {
      console.log('Data loaded:', data);
      this.employee = data;
      this.updateDisplayedEmployees();
    }, error => {
      console.error('Error fetching payroll details', error);
    });

  }



  updateDisplayedEmployees() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedEmployees = this.employee.slice(startIndex, endIndex);
    this.totalPages = Math.ceil(this.employee.length / this.pageSize);
    console.log('Displayed employees:', this.displayedEmployees);
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

  newEmployee(){
    this.router.navigate(['/home/payroll/register/employee']);
  }

  viewEmployeeDetail(employee: Employee): void {
    // Navegar a la ruta de detalles de employee
    this.router.navigate(['home/payroll/show/detail/employee', employee.id]);
  }


}
