import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { CommonModule } from '@angular/common';
import {PayrollsService} from "../../../services/payroll-services/payrolls.service";
import {Payroll} from "../../../models/payroll-models/payroll";


@Component({
  selector: 'app-show-payrolls-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './show-payrolls-page.component.html',
  styleUrl: './show-payrolls-page.component.css'
})
export class ShowPayrollsPageComponent {

  //Variables
  payrolls: Payroll[] = [];
  Actualpage: number = 1;
  totalPages: number = 1;
  pageSize: number = 10;

  displayedPayrolls: Payroll[] = [];


  //Constructor
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private payrollsService: PayrollsService

) {
    this.updateData();
  }

  // Actualiza los datos de nóminas que se muestran y el número total de páginas
  updateData() {
    // Llamada al servicio para obtener los datos de nómina
    this.payrollsService.getPayrolls().subscribe((payrolls) => {
      // Almacena los datos obtenidos en la variable 'payrolls'
      this.payrolls = payrolls;

      // Calcula los índices de inicio y fin de los datos para mostrar en la página actual
      const startIndex = (this.Actualpage - 1) * this.pageSize;
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

  previousPage() {
    if (this.Actualpage > 1) {
      this.Actualpage--;
      this.updateURL();
      this.updateData();
    }
  }

  nextPage() {
    if (this.Actualpage < this.totalPages) {
      this.Actualpage++;
      this.updateURL();
      this.updateData();
    }
  }

  private updateURL() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { pagina: this.Actualpage, pageSize: this.pageSize },
      queryParamsHandling: 'merge',
    });
  }
}
