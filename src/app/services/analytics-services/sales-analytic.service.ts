import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SalesAnalyticService {

  private apiUrl = 'http://10.43.101.58:8081/sales';

  constructor(private http: HttpClient) { }

  getTopSaledProductsVsSales(): Observable<any> {
    return this.http.get(`${this.apiUrl}/top-saled-products-vs-sales`);
  }

  getMonthVsIncome(): Observable<any> {
    return this.http.get(`${this.apiUrl}/month-vs-income`);
  }

  getBranchVsSales(): Observable<any> {
    return this.http.get(`${this.apiUrl}/branch-vs-sales`);
  }


}
