import { Injectable } from '@angular/core';
import { branch } from '../../models/Inventory/branch';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {

  constructor() { }
  getAll(): Observable<branch[]> {
    // Simulando datos de sucursales
    const sucursales: branch[] = [
      { id: 1, name: 'Hayuelos', enabled: true, products: [] },
      { id: 2, name: 'Javeriana', enabled: true, products: [] },
      { id: 3, name: 'Caracas', enabled: true, products: [] }
    ];
    return of(sucursales);
  }
}

