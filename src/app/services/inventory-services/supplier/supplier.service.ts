import { Injectable } from '@angular/core';
import {supplier} from "../../../Models/Inventory/supplier";
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import {environment} from "../../../../environments/environment";
import {of} from "rxjs";
interface PaginatedResult<T> {
  data: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private http: HttpClient) { }

   createSupplier(newsupplier: supplier, companyId: number): Observable<boolean> {
     switch (newsupplier.supplierType) {
        case 'Persona':
          newsupplier.supplierType = '1';
          break;
        case 'Empresa':
          newsupplier.supplierType = '2';
          break;
        case 'Organización':
          newsupplier.supplierType = '3';
          break;
        case 'Fundación':
          newsupplier.supplierType = '4';
          break;
     }
     //TODO: 'include company id in the request'
     //return this.http.post<supplier>(`${environment.baseURL}/create/supplier`, newsupplier);
     //return this.http.post<supplier>('https://localhost:7071/api/supplier', newsupplier);
     return of(true);
  }

  generateSupplierId(): Observable<number> {
    //return this.http.get<number>(`${environment.baseURL}/supplier/generate/id`);
    //return this.http.get<number>('https://localhost:7071/api/supplier/generate/id');
    let numero = 82374;
    return of(numero);
  }

  getSupplierById(supplierId: number, companyId: number): Observable<supplier> {
    //TODO: 'include company id in the request'
    //return this.http.get<supplier>(`${environment.baseURL}/get/supplier/${supplierId}`);
    //return this.http.get<supplier>(`https://localhost:7071/api/get/supplier/${supplierId}`);
    let supplier: supplier = {
      id: 82374,
      name: 'Juan Perez',
      supplierType: '1',
      address: 'Calle 123',
      phone: '123456',
      email: 'akfhk@',
      urlPage: 'www.juanperez.com',
      serviceType: 'Servicio'
    };
    return of(supplier);
  }

  getAllSuppliersByCompany(companyId: number): Observable<supplier[]>{
    //return this.http.get<supplier[]>(`${environment.baseURL}/get/suppliers/${companyId}`);
    //return this.http.get<supplier[]>(`https://localhost:7071/get/suppliers/${companyId}`);
    let suppliers: supplier[] = [
      {
        id: 82374,
        name: 'Juan Perez',
        supplierType: '1',
        address: 'Calle 123',
        phone: '123',
        email: 'akfhk@',
        urlPage: 'www.juanperez.com',
        serviceType: 'Servicio'
      },
      {
        id: 82375,
        name: 'Maria Perez',
        supplierType: '1',
        address: 'Calle 123',
        phone: '123',
        email: 'akfhk@',
        urlPage: 'www.juanperez.com',
        serviceType: 'Servicio'
      },
      {
        id: 82376,
        name: 'Pedro Perez',
        supplierType: '2',
        address: 'Calle 123',
        phone: '123',
        email: 'akfhk@',
        urlPage: 'www.juanperez.com',
        serviceType: 'Servicio'
      },
      {
        id: 82377,
        name: 'Jose Perez',
        supplierType: '4',
        address: 'Calle 123',
        phone: '123',
        email: 'akfhk@',
        urlPage: 'www.juanperez.com',
        serviceType: 'Servicio'
      },
      {
        id: 82378,
        name: 'Ana Perez',
        supplierType: '3',
        address: 'Calle 123',
        phone: '123',
        email: 'akfhk@',
        urlPage: 'www.juanperez.com',
        serviceType: 'Servicio'
      }];
    return of(suppliers);
  }

  deleteSupplier(supplierId: number, companyId:number): Observable<boolean>{
    //TODO: 'include company id in the request'
    //return this.http.delete(`${environment.baseURL}/delete/supplier/${supplierId}`);
    //return this.http.delete(`https://localhost:7071/delete/supplier/${supplierId}`);
    return of(true);
  }

  editSupplier(supplier: supplier, companyId:number): Observable<boolean>{
    switch (supplier.supplierType) {
      case 'Persona':
        supplier.supplierType = '1';
        break;
      case 'Empresa':
        supplier.supplierType = '2';
        break;
      case 'Organización':
        supplier.supplierType = '3';
        break;
      case 'Fundación':
        supplier.supplierType = '4';
        break;
    }
    //TODO: 'include company id in the request'
    //return this.http.put(`${environment.baseURL}/edit/supplier`, supplier);
    //return this.http.put(`https://localhost:7071/edit/supplier`, supplier);
    return of(true);
  }
}

