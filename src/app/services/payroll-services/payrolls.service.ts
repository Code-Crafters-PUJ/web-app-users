import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, of, throwError} from "rxjs";
import {Payroll} from "../../models/payroll-models/payroll";
import {Employee} from "../../models/payroll-models/employee";

@Injectable({
  providedIn: 'root',
})
export class PayrollsService {
  private apiUrl = 'http://localhost:3000/';
  private payrolls: Payroll[] = [];
  private employees: Employee[] = [];


  constructor(private http: HttpClient) {
  }

  //servicios para nomina
  getPayrolls(): Observable<Payroll[]> {

    console.log(this.http.get<Payroll[]>(this.apiUrl + 'payroll/all'));
    return this.http.get<Payroll[]>(this.apiUrl + 'payroll/all').pipe(
      catchError(this.handleError)
    );

    //return of(this.payrolls);
    /* this.payrolls  = [
       {
         "id": "PR12345",
         "state": "en espera",
         "liquidationType": "Mensual",
         "payrollName": "Nomina para POs",
         "month": "Octubre (I)",
         "year": 2024,
         "employees": [
           {
             "id": 1,
             "firstName": "Juana",
             "lastName": "Martinez",
             "dateOfBirth": new Date("1985-05-15"),
             "gender": "Masculino",
             "typeCard": "Cédula de ciudadanía",
             "idCard": "12345678",
             "city": "Bogotá D. C.",
             "address": "Aralia de castilla",
             "maritalStatus": "Casado",
             "phoneNumber": "523-98-74",
             "education": {
               "id": 1,
               "level": "Profesional",
               "title": "Ingeniero de sistemas",
               "endDate": new Date("2007-06-01"),
               "nameInstitution": "Universidad Javeridad"
             },
             "companyId": 101,
             "contact": {
               "id": 1,
               "name": "Felipe Garcia",
               "phone": "555-5678",
               "relationship": "Esposo"
             },
             "contract": [
               {
                 "id": 1,
                 "contractType": {
                   "id": 1,
                   "type": "Término Indefinido"
                 },
                 "startDate": new Date("2023-05-01"),
                 "endDate": new Date("2023-11-01"),
                 "duration": "6 meses",
                 "position": "Desarrollador",
                 "baseSalary": 80000,
                 "transportAllowance": true,
                 "healthAndPensions": true,
                 "severancePay": true,
                 "serviceBonus": true,
                 "totalSalary": 120000
               }
             ]
           }
         ],
         "totalIncome": 160000,
         "totalDeductions": 32000,
         "totalNet": 128000
       }
     ]
     return of(this.payrolls);*/
  }

  addPayroll(payroll: Payroll): Observable<Payroll> {
    /*this.payrolls.push(payroll);
    return of(payroll);*/

    return this.http.post<Payroll>(`${this.apiUrl}payroll/create`, payroll).pipe(
      catchError(this.handleError)  // Manejo de errores
    );
  }

  addEmployee(employee: Employee): Observable<Employee> {
   /* this.employees.push(employee);
    return of(employee);*/

    return this.http.post<Employee>(`${this.apiUrl}employee/create`, employee).pipe(
      catchError(this.handleError)  // Manejo de errores
    );

  }

  //servicios para empleados

  // Método para obtener empleados
  getEmployees(): Observable<Employee[]> {
    /*const simulatedEmployees: Employee[] = [
      {
        id: 1,
        idCard: '123456789',
        typeCard: 'Tarjeta de identidad',
        firstName: 'Juan',
        lastName: 'Pérez',
        dateOfBirth: new Date('1990-05-15'),
        address: 'Calle 123, Ciudad XYZ',
        city: 'Ciudad XYZ',
        maritalStatus: 'Soltero',
        phoneNumber: '123-456-7890',
        gender: 'Masculino',
        education: {
          id: 1,
          nameInstitution: 'Universidad ABC',
          level: 'Licenciatura',
          endDate: new Date('2012-12-31'),
          title: 'Licenciado en Ingeniería',
        },
        companyId: 101,
        contact: {
          id: 1,
          name: 'María Pérez',
          phone: '555-1234',
          relationship: 'Hermana',
        },
        contract: [
          {
            id: 1,
            startDate: new Date('2023-01-01'),
            endDate: new Date('2023-12-31'),
            contractType: {
              id: 1,
              type: 'Tiempo completo',
            },
            duration: '12 meses',
            position: 'Analista de sistemas',
            baseSalary: 2000,
            transportAllowance: true,
            healthAndPensions: true,
            severancePay: true,
            serviceBonus: true,
            totalSalary: 2500,
          },
        ],
      }, {
        id: 2,
        idCard: '1263786789',
        typeCard: 'Tarjeta de identidad',
        firstName: 'Felipe',
        lastName: 'Pérez',
        dateOfBirth: new Date('1990-05-15'),
        address: 'Calle 123, Ciudad XYZ',
        city: 'Ciudad XYZ',
        maritalStatus: 'Soltero',
        phoneNumber: '123-456-7890',
        gender: 'Masculino',
        education: {
          id: 1,
          nameInstitution: 'Universidad ABC',
          level: 'Licenciatura',
          endDate: new Date('2012-12-31'),
          title: 'Licenciado en Ingeniería',
        },
        companyId: 101,
        contact: {
          id: 1,
          name: 'María Pérez',
          phone: '555-1234',
          relationship: 'Hermana',
        },
        contract: [
          {
            id: 1,
            startDate: new Date('2023-01-01'),
            endDate: new Date('2023-12-31'),
            contractType: {
              id: 1,
              type: 'Tiempo completo',
            },
            duration: '12 meses',
            position: 'Analista de sistemas',
            baseSalary: 2000,
            transportAllowance: true,
            healthAndPensions: true,
            severancePay: true,
            serviceBonus: true,
            totalSalary: 2500,
          },
        ],
      }
    ];

    return of(simulatedEmployees);*/

    console.log(this.http.get<Employee[]>(this.apiUrl + 'employee/all'));
    return this.http.get<Employee[]>(this.apiUrl + 'employee/all').pipe(
      catchError(this.handleError)
    );



  }


  getPayrollDetails(id: string | null): Observable<any> {
    //return this.http.get(`/api/payroll/${id}`);
/*
    if (id) {
      const payroll = this.payrolls.find(p => p.id === id);
      if (payroll) {
        return of(payroll);
      } else {
        return throwError(`Payroll with ID ${id} not found`);
      }
    } else {
      return throwError('Invalid ID');
    }
    */

    if (id) {
      return this.http.get<Payroll>(`${this.apiUrl}payroll/${id}`).pipe(
        catchError(this.handleError)  // Manejo de errores
      );
    } else {
      return throwError('Invalid ID');  // Lanzar error si el ID es nulo o inválido
    }

  }

  deletePayroll(id: string): Observable<any> {
    /*// Simulamos la eliminación filtrando las nóminas que no coincidan con el ID
    this.payrolls = this.payrolls.filter(payroll => payroll.id !== id);
    return of({status: 'success'});*/

    // La URL incluye el ID de la nómina a eliminar
    const url = `${this.apiUrl}payroll/delete/${id}`;

    return this.http.delete(url).pipe(
      catchError(this.handleError)  // Manejo de errores
    );
  }



  deleteEmployee(id: string): Observable<any> {


    // La URL incluye el ID del empleado  a eliminar
    const url = `${this.apiUrl}employee/delete/${id}`;

    return this.http.delete(url).pipe(
      catchError(this.handleError)  // Manejo de errores
    );
  }



  updatePayrollStatus(id: string, newState: string): Observable<any> {
    /*const payroll = this.payrolls.find(p => p.id === id);
    if (payroll) {
      payroll.state = newState;
      return of({status: 'success'});
    } else {
      return throwError('Payroll not found');
    }*/

    // La URL incluye el ID de la nómina a actualizar
    const url = `${this.apiUrl}payroll/update/${id}`;
    // Crea un objeto que solo contiene el nuevo estado
    const body = { newState };

    return this.http.put(url, body).pipe(
      catchError(this.handleError)  // Manejo de errores
    );


  }


  getEmployeeDetails(id: string | null): Observable<any> {
    /*//return this.http.get(`/api/payroll/${id}`);
    if (id) {
      const employee = this.employees.find(p => p.id.toString() === id);
      if (employee) {
        return of(employee);
      } else {
        return throwError(`Employee with ID ${id} not found`);
      }
    } else {
      return throwError('Invalid ID');
    }*/

    if (id) {
      // Construye la URL incluyendo el ID del empleado
      const url = `${this.apiUrl}employee/${id}`;
      return this.http.get<Employee>(url).pipe(
        catchError(this.handleError)  // Manejo de errores
      );
    } else {
      return throwError('Invalid ID');  // Lanzar un error si el ID es nulo o inválido
    }


  }


  updateEmployee(id: string, updatedEmployee: Employee): Observable<Employee> {
    /*const index = this.employees.findIndex(e => e.id.toString() === employeeId);
    if (index !== -1) {
      this.employees[index] = updatedEmployee;
      return of(this.employees[index]);
    } else {
      return throwError(`Employee with ID ${employeeId} not found`);
    }*/

    // Construye la URL incluyendo el ID del empleado
    const url = `${this.apiUrl}employee/update/${id}`;
    return this.http.put<Employee>(url, updatedEmployee).pipe(
      catchError(this.handleError)  // Manejo de errores
    );
  }

  // Método para manejar errores de la solicitud HTTP
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      console.error('Client-side error:', error.error.message);
      return throwError('An unexpected error occurred. Please try again later.');
    } else {
      // The backend returned an unsuccessful response code
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
      return throwError(`Error ${error.status}: ${error.message}`);
    }
  }



}
