import { Injectable } from '@angular/core';
import { bill } from '../../models/sales-models/bill';
import { Observable, of } from 'rxjs';
import { product } from '../../models/Inventory/product';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor() { }
  getAll(): Observable<bill[]> {
    // Simulando datos de facturas
    const facturas: bill[] = [
      // Facturas para Sucursal 1
      { billNumber: 1, date: new Date(), clientID: '4216541246', billhasproduct: [], withholdingtax: false, chargetax: true, branch_id: 1 },
      { billNumber: 2, date: new Date(), clientID: '646364563', billhasproduct: [], withholdingtax: false, chargetax: true, branch_id: 1 },
      { billNumber: 3, date: new Date(), clientID: '42542542', billhasproduct: [], withholdingtax: false, chargetax: true, branch_id: 1 },
      // Facturas para Sucursal 2
      { billNumber: 4, date: new Date(), clientID: '2542542542', billhasproduct: [], withholdingtax: false, chargetax: true, branch_id: 2 },
      { billNumber: 5, date: new Date(), clientID: '45242542', billhasproduct: [], withholdingtax: false, chargetax: true, branch_id: 2 },
      // Facturas para Sucursal 3
      { billNumber: 6, date: new Date(), clientID: '67642236', billhasproduct: [], withholdingtax: false, chargetax: true, branch_id: 3 },
      { billNumber: 7, date: new Date(), clientID: '5732523', billhasproduct: [], withholdingtax: false, chargetax: true, branch_id: 3 },
      { billNumber: 8, date: new Date(), clientID: '575373573', billhasproduct: [], withholdingtax: false, chargetax: true, branch_id: 3 },
      { billNumber: 9, date: new Date(), clientID: 'Y537537352', billhasproduct: [], withholdingtax: false, chargetax: true, branch_id: 3 },
      { billNumber: 10, date: new Date(), clientID: '753753', billhasproduct: [], withholdingtax: false, chargetax: true, branch_id: 3 },
      { billNumber: 11, date: new Date(), clientID: '5375327532', billhasproduct: [], withholdingtax: false, chargetax: true, branch_id: 3 }
    ];
    facturas.forEach(factura => {
      const numProductos = Math.floor(Math.random() * 5) + 1; // Generar un número aleatorio de productos entre 1 y 5
      const productos: product[] = [];
      for (let i = 0; i < numProductos; i++) {
        const nuevoProducto: product = {
          id: i + 1,
          name: `Producto ${i + 1}`,
          description: `Descripción del producto ${i + 1}`,
          category: 'Categoría',
          sellPrice: Math.floor(Math.random() * 100) + 1 // Generar un precio aleatorio entre 1 y 100
      };productos.push(nuevoProducto)}
    
        factura.billhasproduct.push({
          billid: factura.billNumber,
          product: productos,
          quantity: Math.floor(Math.random() * 10) + 1, // Generar una cantidad aleatoria entre 1 y 10
          unitPrice: Math.floor(Math.random() * 100) + 1, // Generar un precio unitario aleatorio entre 1 y 100
          discount_percentage: Math.floor(Math.random() * 20) // Generar un descuento aleatorio entre 0 y 20%
        });
    });
    return of(facturas);
  }
}
