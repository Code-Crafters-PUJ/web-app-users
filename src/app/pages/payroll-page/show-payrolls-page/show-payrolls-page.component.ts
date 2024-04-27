import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { CommonModule } from '@angular/common';
import {PayrollsService} from "../../../services/payroll-services/payrolls.service";


@Component({
  selector: 'app-show-payrolls-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './show-payrolls-page.component.html',
  styleUrl: './show-payrolls-page.component.css'
})
export class ShowPayrollsPageComponent {

  //Variables
  Actualpage: number = 1;
  totalPages: number = 1;
  pageSize: number = 10;


  displayedPayrolls: Array<{
    estado: string;
    nombreNomina: string;
    tipoLiquidacion: string;
    periodoPago: string;
    totalNomina: number;
  }> = [];


  // Lista de datos de nóminas (debería provenir de un servicio)
  payrolls = [
    { estado: 'Activo', nombreNomina: 'Nomina Mensual', tipoLiquidacion: 'Mensual', periodoPago: '01/04/2024 - 30/04/2024', totalNomina: 10000 },
    { estado: 'Activo', nombreNomina: 'Nomina Mensual', tipoLiquidacion: 'Mensual', periodoPago: '01/04/2024 - 30/04/2024', totalNomina: 10000 },
    { estado: 'Activo', nombreNomina: 'Nomina Mensual', tipoLiquidacion: 'Mensual', periodoPago: '01/04/2024 - 30/04/2024', totalNomina: 10000 },
    { estado: 'Activo', nombreNomina: 'Nomina Mensual', tipoLiquidacion: 'Mensual', periodoPago: '01/04/2024 - 30/04/2024', totalNomina: 10000 },
    { estado: 'Activo', nombreNomina: 'Nomina Mensual', tipoLiquidacion: 'Mensual', periodoPago: '01/04/2024 - 30/04/2024', totalNomina: 10000 },
    { estado: 'Activo', nombreNomina: 'Nomina Mensual', tipoLiquidacion: 'Mensual', periodoPago: '01/04/2024 - 30/04/2024', totalNomina: 10000 },
    { estado: 'Activo', nombreNomina: 'Nomina Mensual', tipoLiquidacion: 'Mensual', periodoPago: '01/04/2024 - 30/04/2024', totalNomina: 10000 },
    { estado: 'Activo', nombreNomina: 'Nomina Mensual', tipoLiquidacion: 'Mensual', periodoPago: '01/04/2024 - 30/04/2024', totalNomina: 10000 },
    { estado: 'Activo', nombreNomina: 'Nomina Mensual', tipoLiquidacion: 'Mensual', periodoPago: '01/04/2024 - 30/04/2024', totalNomina: 10000 },
    { estado: 'Activo', nombreNomina: 'Nomina Mensual', tipoLiquidacion: 'Mensual', periodoPago: '01/04/2024 - 30/04/2024', totalNomina: 10000 },
    { estado: 'Activo', nombreNomina: 'Nomina Mensual', tipoLiquidacion: 'Mensual', periodoPago: '01/04/2024 - 30/04/2024', totalNomina: 10000 },
    { estado: 'Activo', nombreNomina: 'Nomina Mensual', tipoLiquidacion: 'Mensual', periodoPago: '01/04/2024 - 30/04/2024', totalNomina: 10000 },
    { estado: 'Activo', nombreNomina: 'Nomina Mensual', tipoLiquidacion: 'Mensual', periodoPago: '01/04/2024 - 30/04/2024', totalNomina: 10000 },
    { estado: 'Activo', nombreNomina: 'Nomina Mensual', tipoLiquidacion: 'Mensual', periodoPago: '01/04/2024 - 30/04/2024', totalNomina: 10000 },
    { estado: 'Activo', nombreNomina: 'Nomina Mensual', tipoLiquidacion: 'Mensual', periodoPago: '01/04/2024 - 30/04/2024', totalNomina: 10000 },
    { estado: 'Activo', nombreNomina: 'Nomina Mensual', tipoLiquidacion: 'Mensual', periodoPago: '01/04/2024 - 30/04/2024', totalNomina: 10000 },
    { estado: 'Activo', nombreNomina: 'Nomina Mensual', tipoLiquidacion: 'Mensual', periodoPago: '01/04/2024 - 30/04/2024', totalNomina: 10000 },
    { estado: 'Activo', nombreNomina: 'Nomina Mensual', tipoLiquidacion: 'Mensual', periodoPago: '01/04/2024 - 30/04/2024', totalNomina: 10000 },
    { estado: 'Activo', nombreNomina: 'Nomina Mensual', tipoLiquidacion: 'Mensual', periodoPago: '01/04/2024 - 30/04/2024', totalNomina: 10000 },
    { estado: 'Activo', nombreNomina: 'Nomina Mensual', tipoLiquidacion: 'Mensual', periodoPago: '01/04/2024 - 30/04/2024', totalNomina: 10000 },
    { estado: 'Activo', nombreNomina: 'Nomina Mensual', tipoLiquidacion: 'Mensual', periodoPago: '01/04/2024 - 30/04/2024', totalNomina: 10000 },
    { estado: 'Activo', nombreNomina: 'Nomina Mensual', tipoLiquidacion: 'Mensual', periodoPago: '01/04/2024 - 30/04/2024', totalNomina: 10000 },
    { estado: 'Activo', nombreNomina: 'Nomina Mensual', tipoLiquidacion: 'Mensual', periodoPago: '01/04/2024 - 30/04/2024', totalNomina: 10000 },
    { estado: 'Activo', nombreNomina: 'Nomina Mensual', tipoLiquidacion: 'Mensual', periodoPago: '01/04/2024 - 30/04/2024', totalNomina: 10000 },
    { estado: 'Activo', nombreNomina: 'Nomina Mensual', tipoLiquidacion: 'Mensual', periodoPago: '01/04/2024 - 30/04/2024', totalNomina: 10000 },
    { estado: 'Activo', nombreNomina: 'Nomina Mensual', tipoLiquidacion: 'Mensual', periodoPago: '01/04/2024 - 30/04/2024', totalNomina: 10000 },
    { estado: 'Activo', nombreNomina: 'Nomina Mensual', tipoLiquidacion: 'Mensual', periodoPago: '01/04/2024 - 30/04/2024', totalNomina: 10000 },
    { estado: 'Activo', nombreNomina: 'Nomina Mensual', tipoLiquidacion: 'Mensual', periodoPago: '01/04/2024 - 30/04/2024', totalNomina: 10000 },
    { estado: 'Activo', nombreNomina: 'Nomina Mensual', tipoLiquidacion: 'Mensual', periodoPago: '01/04/2024 - 30/04/2024', totalNomina: 10000 },
    { estado: 'Activo', nombreNomina: 'Nomina Mensual', tipoLiquidacion: 'Mensual', periodoPago: '01/04/2024 - 30/04/2024', totalNomina: 10000 },
    { estado: 'Activo', nombreNomina: 'Nomina Mensual', tipoLiquidacion: 'Mensual', periodoPago: '01/04/2024 - 30/04/2024', totalNomina: 10000 },
    { estado: 'Activo', nombreNomina: 'Nomina Mensual', tipoLiquidacion: 'Mensual', periodoPago: '01/04/2024 - 30/04/2024', totalNomina: 10000 },
    { estado: 'Activo', nombreNomina: 'Nomina Mensual', tipoLiquidacion: 'Mensual', periodoPago: '01/04/2024 - 30/04/2024', totalNomina: 10000 },
    { estado: 'Activo', nombreNomina: 'Nomina Mensual', tipoLiquidacion: 'Mensual', periodoPago: '01/04/2024 - 30/04/2024', totalNomina: 10000 },
    { estado: 'Activo', nombreNomina: 'Nomina Mensual', tipoLiquidacion: 'Mensual', periodoPago: '01/04/2024 - 30/04/2024', totalNomina: 10000 },

  ];


  //Constructor
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private payrollsService: PayrollsService

) {
    this.updateData();
  }

  // Métodos para la paginación
  // Actualiza los datos de nóminas que se muestran y el número total de páginas
  updateData() {
    this.payrollsService.getPayrolls().subscribe((payrolls) => {
      this.payrolls = payrolls;
      const startIndex = (this.Actualpage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;

      // Actualiza los datos de nóminas para mostrar solo los registros de la página actual
      this.displayedPayrolls = this.payrolls.slice(startIndex, endIndex);

      // Calcula el número total de páginas
      this.totalPages = Math.ceil(this.payrolls.length / this.pageSize);
    });
  }

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
