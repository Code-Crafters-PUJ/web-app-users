import {Component, OnInit} from '@angular/core';
import {Payroll} from "../../../models/payroll-models/payroll";
import {ActivatedRoute, Router} from "@angular/router";
import {PayrollsService} from "../../../services/payroll-services/payrolls.service";
import {Employee} from "../../../models/payroll-models/employee";
import {FormsModule} from "@angular/forms";
import {CurrencyPipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-new-payroll-page',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    CurrencyPipe
  ],
  templateUrl: './new-payroll-page.component.html',
  styleUrl: './new-payroll-page.component.css'
})
export class NewPayrollPageComponent implements OnInit {

  //Variables
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
  displayedEmployees: Employee[] = [];
  totalIncome: number = 0;
  totalDeductions: number = 0;
  totalNet: number = 0;
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


//contructor
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private payrollsService: PayrollsService
  ) {
  }

  ngOnInit(): void {
    this.updateData();
  }

//actualizacion de datos
  // Actualización de datos
  updateData() {
    // Llamada al servicio para obtener los datos de empleados
    this.payrollsService.getEmployees().subscribe((employees) => {
      // Almacena los datos obtenidos en la variable 'employees'
      this.employees = employees;

      // Calcula los índices de inicio y fin de los datos para mostrar en la página actual
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;

      // Filtra los datos de nómina para mostrar solo los registros de la página actual
      this.displayedEmployees = this.employees.slice(startIndex, endIndex);

      // Calcula el número total de páginas
      this.totalPages = Math.ceil(this.employees.length / this.pageSize);
    }, (error) => {
      // Manejo de errores
      console.error('Error al obtener los datos de Empleado:', error);
    });
  }


  // Métodos para la paginación
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateURL();
      this.updateData();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateURL();
      this.updateData();
    }
  }


  private updateURL() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {pagina: this.currentPage, pageSize: this.pageSize},
      queryParamsHandling: 'merge',
    });
  }

// Método para cancelar la creación de la nómina
  cancelPayroll() {
    this.router.navigate(['/home/payroll/show/all/payrolls']);
  }

  // Método para guardar la nómina
  savePayroll() {
    this.payroll.employees = this.employees.filter(e => this.selectedEmployees[e.id]);
    if (this.payroll) {
      this.payrollsService.addPayroll(this.payroll).subscribe(() => {
        this.router.navigate(['/home/payroll/show/all/payrolls']);
      }, (error) => {
        console.error('Error al guardar la nómina:', error);
      });
    }
  }



  // Método para enviar el formulario
  onSubmit() {
    this.savePayroll();
  }


  //metodos del checkbox
  updateSelection(employee: Employee) {
    this.selectedEmployees[employee.id] = !this.selectedEmployees[employee.id];
    this.calculateTotal();
  }

  calculateTotal() {
    // Calcula el total neto sumando los salarios de los empleados seleccionados.
    this.totalNet = this.displayedEmployees
      .filter(emp => this.selectedEmployees[emp.id])
      .reduce((acc, curr) => acc + (curr.contract.length > 0 ? curr.contract[0].totalSalary : 0), 0);

    // Calcula el total de deducciones como el 8% del total neto.
    this.totalDeductions = this.totalNet * 0.08;

    // Calcula el total de ingresos sumando el total neto y las deducciones.
    this.totalIncome = this.totalNet + this.totalDeductions;
  }

}
