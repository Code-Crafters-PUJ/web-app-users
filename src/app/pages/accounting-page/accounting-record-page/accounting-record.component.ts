import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { SidebarComponent } from '../../../general/sidebar/sidebar.component';

interface AccountingRecord {
  codigo: number;
  cliente: string;
  fecha: string;
  descripcion: string;
  cantidad: number;
  impuestos: number;
  total: number;
}

@Component({
  selector: 'app-accounting-record',
  standalone: true,
  imports: [NgFor,SidebarComponent],
  templateUrl: './accounting-record.component.html',
  styleUrl: './accounting-record.component.css'
})
export class AccountingRecordComponent {
  rowsPerPage = 10;
  currentPage = 1;

  // Ejemplo de datos. Reemplaza esto con los datos que necesites.
  allRows: AccountingRecord[] = [
    { codigo: 1, cliente: 'Juan', fecha: '2024-01-01', descripcion: 'Compra', cantidad: 30, impuestos: 5, total: 35 },
    { codigo: 2, cliente: 'Ana', fecha: '2024-01-02', descripcion: 'Venta', cantidad: 25, impuestos: 3, total: 28 },
    { codigo: 2, cliente: 'Ana', fecha: '2024-01-02', descripcion: 'Venta', cantidad: 25, impuestos: 3, total: 28 },
    { codigo: 2, cliente: 'Ana', fecha: '2024-01-02', descripcion: 'Venta', cantidad: 25, impuestos: 3, total: 28 },
    { codigo: 2, cliente: 'Ana', fecha: '2024-01-02', descripcion: 'Venta', cantidad: 25, impuestos: 3, total: 28 },
    { codigo: 2, cliente: 'Ana', fecha: '2024-01-02', descripcion: 'Venta', cantidad: 25, impuestos: 3, total: 28 },
    { codigo: 2, cliente: 'Ana', fecha: '2024-01-02', descripcion: 'Venta', cantidad: 25, impuestos: 3, total: 28 },
    { codigo: 2, cliente: 'Ana', fecha: '2024-01-02', descripcion: 'Venta', cantidad: 25, impuestos: 3, total: 28 },
    { codigo: 2, cliente: 'Ana', fecha: '2024-01-02', descripcion: 'Venta', cantidad: 25, impuestos: 3, total: 28 },
    { codigo: 2, cliente: 'Ana', fecha: '2024-01-02', descripcion: 'Venta', cantidad: 25, impuestos: 3, total: 28 },
    { codigo: 2, cliente: 'Ana', fecha: '2024-01-02', descripcion: 'Venta', cantidad: 25, impuestos: 3, total: 28 },
    // Añade más registros según sea necesario...
  ];

  get totalPages(): number {
    return Math.ceil(this.allRows.length / this.rowsPerPage);
  }

  // Devuelve solo las filas correspondientes a la página actual
  get visibleRows(): AccountingRecord[] {
    const start = (this.currentPage - 1) * this.rowsPerPage;
    const end = start + this.rowsPerPage;
    return this.allRows.slice(start, end);
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
}