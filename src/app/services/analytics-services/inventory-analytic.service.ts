import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class InventoryAnalyticService {

  private apiUrl = 'http://localhost:3000/inventory';

  constructor(private http: HttpClient ) { }

  getcategoryVsStockPercentage(): Observable<any> {
    return this.http.get(`${this.apiUrl}/category-vs-stock-percentage`);
  }

  getproductVsTop5lessStock(): Observable<any> {
    return this.http.get(`${this.apiUrl}/product-vs-top-5-less-stock`);
  }


  getproviderVsStockPercentage(): Observable<any> {
    return this.http.get(`${this.apiUrl}/provider-vs-stock-percentage`);
  }


}

