import { Injectable } from '@angular/core';
import {supplier} from "../../../Models/Inventory/supplier";
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import {environment} from "../../../../environments/environment";
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private suppliers: supplier[] = [
    {
      id: 82374,
      name: 'Juan Perez',
      supplierType: '1',
      address: 'Calle 123',
      phone: '123456',
      email: 'akfhk@',
      urlPage: 'www.juanperez.com',
      serviceType: 'Servicio'
    },
    {
      id: 82375,
      name: 'Maria Perez',
      supplierType: '1',
      address: 'Calle 123',
      phone: '123456',
      email: 'akfhk@',
      urlPage: 'www.juanperez.com',
      serviceType: 'Servicio'
    },
    {
      id: 82376,
      name: 'Pedro Perez',
      supplierType: '2',
      address: 'Calle 123',
      phone: '123456',
      email: 'akfhk@',
      urlPage: 'www.juanperez.com',
      serviceType: 'Servicio'
    },
    {
      id: 82377,
      name: 'Jose Perez',
      supplierType: '4',
      address: 'Calle 123',
      phone: '123456',
      email: 'akfhk@',
      urlPage: 'www.juanperez.com',
      serviceType: 'Servicio'
    },
    {
      id: 82378,
      name: 'Ana Perez',
      supplierType: '3',
      address: 'Calle 123',
      phone: '123456',
      email: 'akfhk@',
      urlPage: 'www.juanperez.com',
      serviceType: 'Servicio'
    }
  ];

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
      //create the supplier in the database
      this.suppliers.push(newsupplier);
     return of(true);
  }

  generateSupplierId(): Observable<number> {
    //return this.http.get<number>(`${environment.baseURL}/supplier/generate/id`);
    //return this.http.get<number>('https://localhost:7071/api/supplier/generate/id');
    //generate a random number that is diferent from the ones in the database

    let num = Math.floor(Math.random() * 100000);
    let i = 0;
    while (i < this.suppliers.length) {
      if (this.suppliers[i].id == num) {
        num = Math.floor(Math.random() * 100000);
        i = 0;
      } else {
        i++;
      }
    }
    return of(num);
  }

  getSupplierById(supplierId: number, companyId: number): Observable<supplier> {
    //TODO: 'include company id in the request'
    //return this.http.get<supplier>(`${environment.baseURL}/get/supplier/${supplierId}`);
    //return this.http.get<supplier>(`https://localhost:7071/api/get/supplier/${supplierId}`);
    //get the supplier from the database
    let supplier: supplier = {
      id: 0,
      name: '',
      supplierType: '',
      address: '',
      phone: '',
      email: '',
      urlPage: '',
      serviceType: ''
    };

    const result = this.suppliers.find(supplier => supplier.id === supplierId);
    if (result !== undefined){
      supplier = result;
    }
    return of(supplier);
  }

  getAllSuppliersByCompany(companyId: number): Observable<supplier[]>{
    //return this.http.get<supplier[]>(`${environment.baseURL}/get/suppliers/${companyId}`);
    //return this.http.get<supplier[]>(`https://localhost:7071/get/suppliers/${companyId}`);
    return of(this.suppliers);
  }

  deleteSupplier(supplierId: number, companyId:number): Observable<boolean>{
    //TODO: 'include company id in the request'
    //return this.http.delete(`${environment.baseURL}/delete/supplier/${supplierId}`);
    //return this.http.delete(`https://localhost:7071/delete/supplier/${supplierId}`);
    //delete the supplier from the database
    let i = 0;
    while (i < this.suppliers.length) {
      if (this.suppliers[i].id == supplierId) {
        this.suppliers.splice(i, 1);
        i = this.suppliers.length;
      } else {
        i++;
      }
    }
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
    //edit the supplier in the database
    let i = 0;
    while (i < this.suppliers.length) {
      if (this.suppliers[i].id == supplier.id) {
        this.suppliers[i] = supplier;
        i = this.suppliers.length;
      } else {
        i++;
      }
    }
    return of(true);
  }
}

