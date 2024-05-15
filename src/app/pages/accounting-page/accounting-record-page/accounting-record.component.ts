import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { SidebarComponent } from '../../../general/sidebar/sidebar.component';
import { RecordsService  } from '../../../services/accounting-services/records/records.service';
import { Ventas, Compras, Gastos, CuentasPorCobrar, CuentasPorPagar, Activos, Pasivos, CapitalContable, TransaccionBancaria, Impuestos, AsuntosContables, EstadosFinancieros } from '../../../Models/accounting/records';


@Component({
  selector: 'app-accounting-record',
  standalone: true,
  imports: [NgFor,SidebarComponent],
  templateUrl: './accounting-record.component.html',
  styleUrl: './accounting-record.component.css'
})

export class AccountingRecordComponent implements OnInit {
  data: {
    compras: Compras[];
    ventas: Ventas[];
    gastos: Gastos[];
    cobrar: CuentasPorCobrar[];
    pagar: CuentasPorPagar[];
    activos: Activos[];
    pasivos: Pasivos[];
    capital: CapitalContable[];
    transacciones: TransaccionBancaria[];
    impuestos: Impuestos[];
    asuntos: AsuntosContables[];
    estados: EstadosFinancieros[];
  } = {
    compras: [],
    ventas: [],
    gastos: [],
    cobrar: [],
    pagar: [],
    activos: [],
    pasivos: [],
    capital: [],
    transacciones: [],
    impuestos: [],
    asuntos: [],
    estados: []
    
  };
  currentPages: {[K in keyof typeof this.data]: number} = {
    compras: 1,
    ventas: 1,
    gastos: 1,
    cobrar: 1,
    pagar: 1,
    activos: 1,
    pasivos: 1,
    capital: 1,
    transacciones: 1,
    impuestos: 1,
    asuntos: 1,
    estados: 1
  };
  
  rowsPerPage = 10;
  
  constructor(private recordsService: RecordsService) { }

  ngOnInit() {
    this.loadAllData();
  }

  loadAllData() {
    this.recordsService.getCompras().subscribe(compras => {
      this.data.compras = compras;
    });
    this.recordsService.getVentas().subscribe(ventas => {
      this.data.ventas = ventas;
    });
    this.recordsService.getGastos().subscribe(gastos => {
      this.data.gastos = gastos;
    });
    this.recordsService.getCuentasPorCobrar().subscribe(cobrar => {
      this.data.cobrar = cobrar;
    });
    this.recordsService.getCuentasPorPagar().subscribe(pagar => {
      this.data.pagar = pagar;
    });
    this.recordsService.getActivos().subscribe(activos => {
      this.data.activos = activos;
    });
    this.recordsService.getPasivos().subscribe(pasivos => {
      this.data.pasivos = pasivos;
    });
    this.recordsService.getCapitalContable().subscribe(capital =>{
      this.data.capital = capital;
    });
    this.recordsService.getTransaccionesBancarias().subscribe(transacciones => {
      this.data.transacciones = transacciones;
    });
    this.recordsService.getImpuestos().subscribe(impuestos => {
      this.data.impuestos = impuestos;
    });
    this.recordsService.getAsientosContables().subscribe(asuntos => {
      this.data.asuntos = asuntos;
    });
    this.recordsService.getEstadosFinancieros().subscribe(estados => {
      this.data.estados = estados;
    });
  }

  goToNextPage(section: keyof typeof this.data) {
    console.log(`Current page before increment: ${this.currentPages[section]}`);
    if (this.currentPages[section] * this.rowsPerPage < this.data[section].length) {
      this.currentPages[section]++;
      console.log(`Current page after increment: ${this.currentPages[section]}`);
    }
}

goToPreviousPage(section: keyof typeof this.data) {
    console.log(`Current page before decrement: ${this.currentPages[section]}`);
    if (this.currentPages[section] > 1) {
      this.currentPages[section]--;
      console.log(`Current page after decrement: ${this.currentPages[section]}`);
    }
}

getCurrentPageData(section: keyof typeof this.data): any[] {
    const startIndex = (this.currentPages[section] - 1) * this.rowsPerPage;
    const endIndex = startIndex + this.rowsPerPage;
    console.log(`Start index: ${startIndex}, End index: ${endIndex}`);
    return this.data[section].slice(startIndex, endIndex);
}

}
