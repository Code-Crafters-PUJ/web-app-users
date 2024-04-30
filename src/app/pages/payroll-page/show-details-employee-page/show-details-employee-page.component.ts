import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PayrollsService} from "../../../services/payroll-services/payrolls.service";
import {Employee} from "../../../models/payroll-models/employee";
import {FormsModule, NgForm} from "@angular/forms";
import {CurrencyPipe} from "@angular/common";

@Component({
  selector: 'app-show-details-employee-page',
  standalone: true,
  imports: [
    FormsModule,
    CurrencyPipe
  ],
  templateUrl: './show-details-employee-page.component.html',
  styleUrl: './show-details-employee-page.component.css'
})
export class ShowDetailsEmployeePageComponent implements OnInit {

  @ViewChild('employeeForm') employeeForm!: NgForm;
  employeeId: string | null = '';
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
    this.employeeId = this.route.snapshot.paramMap.get('id');
    console.log('Payroll ID:', this.employeeId);

    this.payrollsService.getEmployeeDetails(this.employeeId).subscribe(data => {
      console.log('Data loaded:', data);
      this.employee = data;
    }, error => {
      console.error('Error fetching payroll details', error);
    });
  }

  onSubmit() {
    this.modifyEmployee();
  }

  modifyEmployee(): void {
    if (!this.employeeForm.valid) {
      this.employeeForm.form.markAllAsTouched();
      alert('Por favor complete todos los campos requeridos.');
      return;
    }

    this.payrollsService.updateEmployee(this.employee.id.toString(), this.employee).subscribe({
      next: (updatedEmployee) => {
        console.log('Employee updated successfully', updatedEmployee);
        this.router.navigate(['/home/payroll/show/all/employees']);
      },
      error: (error) => {
        console.error('Error updating employee', error);
        alert('Failed to update employee.');
      }
    });

  }


  calculateTotalSalary(): number {
    let total = this.employee.contract[0].baseSalary;
    if (this.employee.contract[0].transportAllowance) {
      total += 162000; // Suma 162,000 si el auxilio de transporte está seleccionado
    }
    if (this.employee.contract[0].healthAndPensions) {
      total += this.employee.contract[0].baseSalary * 0.12; // Suma el 12% del salario base para salud y pensiones
    }
    if (this.employee.contract[0].severancePay) {
      total += this.employee.contract[0].baseSalary * 0.10; // Suma el 10% del salario base para cesantías
    }
    if (this.employee.contract[0].serviceBonus) {
      total += this.employee.contract[0].baseSalary * 0.08; // Suma el 8% del salario base para prima de servicios
    }
    return total;
  }




}
