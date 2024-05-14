import {Component, OnInit, signal, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PayrollsService} from "../../../services/payroll-services/payrolls.service";
import {Employee} from "../../../models/payroll-models/employee";
import {FormsModule, NgForm} from "@angular/forms";
import {ContractType} from "../../../models/payroll-models/contractType";
import {CurrencyPipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-new-employee-page',
  standalone: true,
  imports: [
    FormsModule,
    CurrencyPipe,
    NgIf
  ],
  templateUrl: './new-employee-page.component.html',
  styleUrl: './new-employee-page.component.css'
})
export class NewEmployeePageComponent implements OnInit {
  @ViewChild('employeeForm') employeeForm!: NgForm;
  employee: Employee = {
    id: 0,
    firstName: '',
    lastName: '',
    dateOfBirth: new Date(),
    gender: '',
    typeCard: '',
    idCard: '',
    city: '',
    address: '',
    maritalStatus: '',
    phoneNumber: '',
    education: {
      id: 0,
      level: '',
      title: '',
      endDate: new Date(),
      nameInstitution: ''
    },
    companyId: 0,
    contact: {
      id: 0,
      name: '',
      phone: '',
      relationship: ''
    },
    contract: [{
      id: 0,
      contractType: {
        id: 0,
        type: '',
      },
      startDate: new Date(),
      endDate: new Date(),
      duration: '',
      position: '',
      baseSalary: 0,
      transportAllowance: false,
      healthAndPensions: false,
      severancePay: false,
      serviceBonus: false,
      totalSalary: 0,
    }]
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private payrollsService: PayrollsService
  ) {}

  ngOnInit(): void {


  }

  saveEmployee(): void {
    if (!this.employeeForm.valid) {
      this.employeeForm.form.markAllAsTouched();
      alert('Por favor complete todos los campos requeridos y seleccione al menos un empleado.');
      return;
    }
      this.payrollsService.addEmployee(this.employee).subscribe({
      next: () => {
        console.log('employee saved successfully!' , this.employee);
        this.router.navigate(['/home/payroll/show/all/employees']);
      },
      error: (error) => {
        console.error('Error al guardar el empleado:', error);
      }
    });
  }

  cancel() {
    this.router.navigate(['/home/payroll/show/all/employees']);
  }

  calculateTotalSalary(): number {
    let total = this.employee.contract[0].baseSalary;
    if (this.employee.contract[0].transportAllowance) {
      total += 162000;
    }
    if (this.employee.contract[0].healthAndPensions) {
      total += this.employee.contract[0].baseSalary * 0.12;
    }
    if (this.employee.contract[0].severancePay) {
      total += this.employee.contract[0].baseSalary * 0.10;
    }
    if (this.employee.contract[0].serviceBonus) {
      total += this.employee.contract[0].baseSalary * 0.08;
    }
    return total;
  }


  onSubmit() {
    this.saveEmployee();
  }





}
