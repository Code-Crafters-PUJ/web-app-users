import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

    getCompras(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/compras/getall`);
  }

  getVentas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/ventas/getall`);
  }

  getGastos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/gastos/getall`);
  }

  getCuentasPorCobrar(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/cuentasporcobrar/getall`);
  }

  getCuentasPorPagar(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/cuentasporpagar/getall`);
  }

  getActivos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/activos/getall`);
  }

  getPasivos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/pasivos/getall`);
  }

  getCapitalContable(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/capitalcontable/getall`);
  }

  getTransaccionesBancarias(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/transaccionesbancarias/getall`);
  }

  getImpuestos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/impuestos/getall`);
  }

  getAsientosContables(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/asientoscontables/getall`);
  }

  getEstadosFinancieros(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/estadosfinancieros/getall`);
  }
}
