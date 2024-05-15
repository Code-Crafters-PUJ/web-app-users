import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PayrollAnalyticService {

  private apiUrl = 'http://10.43.101.58:8081/payroll';

  constructor(private http: HttpClient) { }

  getMonthVsSalary(): Observable<any> {
    return this.http.get(`${this.apiUrl}/month-vs-salary`);
  }

  getFortnightVsSalary(): Observable<any> {
    return this.http.get(`${this.apiUrl}/fortnight-vs-salary`);
  }

}
