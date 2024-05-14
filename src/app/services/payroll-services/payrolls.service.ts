import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, of, throwError} from "rxjs";
import {Payroll} from "../../models/payroll-models/payroll";
import {Employee} from "../../models/payroll-models/employee";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class PayrollsService {
  private apiUrl = environment.apiUrl;
  private payrolls: Payroll[] = [];
  private employees: Employee[] = [];


  constructor(private http: HttpClient) {
  }

  //servicios para nomina
  //obener todas la nominas
  getPayrolls(): Observable<Payroll[]> {
    console.log(this.http.get<Payroll[]>(this.apiUrl + 'payroll/all'));
    return this.http.get<Payroll[]>(this.apiUrl + 'payroll/all').pipe(
      catchError(this.handleError)
    );
  }

//obetener una nomina
  getPayrollDetails(id: string | null): Observable<any> {
    if (!id) {
      return throwError(() => new Error('Invalid ID'));
    }
    return this.http.get<any>(`${this.apiUrl}payroll/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  //Modificar el estado de la nomina
  updatePayrollStatus(id: string): Observable<any> {
    if (!id) {
      return throwError(() => new Error('Invalid ID'));
    }
    // Ajusta la ruta según lo indicado
    return this.http.put(`${this.apiUrl}payroll/update/${id}`, null).pipe(
      catchError(this.handleError)
    );
  }

  // Método para agregar una nueva nómina
  addPayroll(payroll: Payroll): Observable<Payroll> {
    return this.http.post<Payroll>(`${this.apiUrl}payroll/create`, payroll).pipe(
      catchError(this.handleError)
    );
  }

  // Método para eliminar una nómina
  deletePayroll(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}payroll/delete/${id}`).pipe(
      catchError(this.handleError)
    );
  }


  //servicios para empleados
  // Método para obtener empleados
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl + 'employee/all').pipe(
      catchError(this.handleError)
    );
  }


//Metodo para obetner un empelado
  getEmployeeDetails(id: string | null): Observable<any> {
    if (!id) {
      return throwError(() => new Error('Invalid ID'));
    }
    return this.http.get<any>(`${this.apiUrl}employee/${id}`).pipe(
      catchError(this.handleError)
    );
  }


  // Método para actualizar los detalles de un empleado
  updateEmployee(id: string, employee: Employee): Observable<Employee> {
    if (!id || !employee) {
      return throwError(() => new Error('Invalid ID or employee data'));
    }
    return this.http.put<Employee>(`${this.apiUrl}employee/update/${id}`, employee).pipe(
      catchError(this.handleError)
    );
  }

  // Método para agregar un nuevo empleado
  addEmployee(employee: Employee): Observable<Employee> {
    console.log(employee);
    return this.http.post<Employee>(`${this.apiUrl}employee/create`, employee).pipe(
      catchError(this.handleError)
    );
  }



  // Método para manejar errores de la solicitud HTTP
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    if (error.error instanceof ErrorEvent) {
      console.error('Client-side error:', error.error.message);
      return throwError(() => new Error('An unexpected error occurred. Please try again later.'));
    } else {
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
      return throwError(() => new Error(`Error ${error.status}: ${error.message}`));
    }
  }

}
