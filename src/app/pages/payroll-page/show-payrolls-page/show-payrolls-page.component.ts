import {Component, OnInit, signal} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { CommonModule } from '@angular/common';
import {PayrollsService} from "../../../services/payroll-services/payrolls.service";
import {Payroll} from "../../../models/payroll-models/payroll";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {SidebarComponent} from "../../../general/sidebar/sidebar.component";


@Component({
  selector: 'app-show-payrolls-page',
  standalone: true,
    imports: [CommonModule, SidebarComponent],
  templateUrl: './show-payrolls-page.component.html',
  styleUrl: './show-payrolls-page.component.css'
})
export class ShowPayrollsPageComponent implements OnInit {

  //Variables
  payrolls: Payroll[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  pageSize: number = 10;
  displayedPayrolls: Payroll[] = [];


  //Constructor
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private payrollsService: PayrollsService

) {}


  ngOnInit(): void {
    this.updateData();
  }

  // Actualiza los datos de nóminas que se muestran y el número total de páginas
  updateData() {
    // Llamada al servicio para obtener los datos de nómina
    this.payrollsService.getPayrolls().subscribe((payrolls) => {
      // Almacena los datos obtenidos en la variable 'payrolls'
      this.payrolls = payrolls;

      // Calcula los índices de inicio y fin de los datos para mostrar en la página actual
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;

      // Filtra los datos de nómina para mostrar solo los registros de la página actual
      this.displayedPayrolls = this.payrolls.slice(startIndex, endIndex);

      // Calcula el número total de páginas
      this.totalPages = Math.ceil(this.payrolls.length / this.pageSize);
    }, (error) => {
      // Manejo de errores
      console.error('Error al obtener los datos de nómina:', error);
    });
  }

  // Métodos para la paginación
  newPayroll(){
  this.router.navigate(['/home/payroll/register/payroll']);
}

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
      queryParams: { pagina: this.currentPage, pageSize: this.pageSize },
      queryParamsHandling: 'merge',
    });
  }

  viewPayrollDetail(payroll: Payroll): void {
    // Navegar a la ruta de detalles de payroll
    this.router.navigate(['home/payroll/show/detail/payroll', payroll.id]);
  }


}
