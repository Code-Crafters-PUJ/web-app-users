import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Payroll} from "../../models/payroll-models/payroll";

@Injectable({
  providedIn: 'root'
})
export class PayrollsService {

  private apiUrl = 'https://backend.com/api/payrolls';



  constructor(private http: HttpClient) { }


  getPayrolls(): Observable<Payroll[]> {
    return this.http.get<Payroll[]>(this.apiUrl);
  }
}
