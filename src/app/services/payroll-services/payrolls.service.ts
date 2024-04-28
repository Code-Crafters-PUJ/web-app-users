import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, of, throwError} from "rxjs";
import {Payroll} from "../../models/payroll-models/payroll";
import {Employee} from "../../models/payroll-models/employee";

@Injectable({
  providedIn: 'root',
})
export class PayrollsService {
  private apiUrl = 'https://backend.com/api/payrolls';

  // Define an array to store payrolls locally
  private payrolls: Payroll[] = [];

  constructor(private http: HttpClient) {}

  getPayrolls(): Observable<Payroll[]> {
    return of(this.payrolls);
  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  addPayroll(payroll: Payroll): Observable<Payroll> {
    this.payrolls.push(payroll);

    return of(payroll);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('HTTP request error:', error);
    return throwError('Something went wrong with the HTTP request');
  }
}
