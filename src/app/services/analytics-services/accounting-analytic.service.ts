import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AccountingAnalyticService {

  private apiUrl = 'http://localhost:3000/accounting';

  constructor(private http: HttpClient ) { }


  getlossVsProfitPercentage(): Observable<any> {
    return this.http.get(`${this.apiUrl}/loss-vs-profit`);
  }

  getcategoryVsPurchaseAndSales(): Observable<any> {
    return this.http.get(`${this.apiUrl}/category-vs-purchase-and-sales`);
  }

}
