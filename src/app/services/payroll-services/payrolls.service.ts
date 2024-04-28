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
  private payrolls: Payroll[] = [];
  private employees: Employee[] = [];


  constructor(private http: HttpClient) {}

  //servicios para nomina
  getPayrolls(): Observable<Payroll[]> {
    return of(this.payrolls);
  }

  addPayroll(payroll: Payroll): Observable<Payroll> {
    this.payrolls.push(payroll);
    return of(payroll);
  }

  //servicios para empleados

  // Método para obtener empleados
  getEmployees(): Observable<Employee[]> {
    // Crea una lista de empleados simulados
    const simulatedEmployees: Employee[] = [
      {
        id: 1,
        idCard: '123456789',
        firstName: 'Juan',
        lastName: 'Pérez',
        dateOfBirth: new Date('1990-05-15'),
        address: 'Calle 123, Ciudad XYZ',
        city: 'Ciudad XYZ',
        education: {
          id: 1,
          name: 'Universidad ABC',
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
            number: 'C-001',
            startDate: new Date('2023-01-01'),
            endDate: new Date('2023-12-31'),
            contractType: {
              id: 1,
              type: 'Tiempo completo',
            },
            baseSalary: 2000,
            transportAllowance: true,
            healthAndPensions: true,
            severancePay: true,
            serviceBonus: true,
            totalSalary: 2500,
          },
        ],
      },
      {
        id: 2,
        idCard: '987654321',
        firstName: 'María',
        lastName: 'Gómez',
        dateOfBirth: new Date('1985-03-22'),
        address: 'Avenida 456, Ciudad ABC',
        city: 'Ciudad ABC',
        education: {
          id: 2,
          name: 'Instituto XYZ',
          level: 'Maestría',
          endDate: new Date('2015-06-30'),
          title: 'Maestro en Ciencias',
        },
        companyId: 102,
        contact: {
          id: 2,
          name: 'Pedro Gómez',
          phone: '555-9876',
          relationship: 'Esposo',
        },
        contract: [
          {
            id: 2,
            number: 'C-002',
            startDate: new Date('2023-02-01'),
            endDate: new Date('2023-12-31'),
            contractType: {
              id: 2,
              type: 'Medio tiempo',
            },
            baseSalary: 1500,
            transportAllowance: false,
            healthAndPensions: false,
            severancePay: false,
            serviceBonus: false,
            totalSalary: 1500,
          },
        ],
      },{
        id: 1,
        idCard: '123456789',
        firstName: 'Juan',
        lastName: 'Pérez',
        dateOfBirth: new Date('1990-05-15'),
        address: 'Calle 123, Ciudad XYZ',
        city: 'Ciudad XYZ',
        education: {
          id: 1,
          name: 'Universidad ABC',
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
            number: 'C-001',
            startDate: new Date('2023-01-01'),
            endDate: new Date('2023-12-31'),
            contractType: {
              id: 1,
              type: 'Tiempo completo',
            },
            baseSalary: 2000,
            transportAllowance: true,
            healthAndPensions: true,
            severancePay: true,
            serviceBonus: true,
            totalSalary: 2500,
          },
        ],
      },{
        id: 3,
        idCard: '123456456789',
        firstName: 'Juan',
        lastName: 'Pérez',
        dateOfBirth: new Date('1990-05-15'),
        address: 'Calle 123, Ciudad XYZ',
        city: 'Ciudad XYZ',
        education: {
          id: 1,
          name: 'Universidad ABC',
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
            number: 'C-001',
            startDate: new Date('2023-01-01'),
            endDate: new Date('2023-12-31'),
            contractType: {
              id: 1,
              type: 'Tiempo completo',
            },
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

    // Devuelve la lista de empleados simulados como un Observable
    return of(simulatedEmployees);
  }

  addEmployee(employee: Employee): Observable<Employee> {
    this.employees.push(employee);
    return of(employee);
  }

  getPayrollDetails(id: string | null): Observable<any> {
    //return this.http.get(`/api/payroll/${id}`);

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
  }

  deletePayroll(id: string): Observable<any> {
    // Simulamos la eliminación filtrando las nóminas que no coincidan con el ID
    this.payrolls = this.payrolls.filter(payroll => payroll.id !== id);
    return of({ status: 'success' });
  }

  updatePayrollStatus(id: string, newState: string): Observable<any> {
    const payroll = this.payrolls.find(p => p.id === id);
    if (payroll) {
      payroll.state = newState;
      return of({ status: 'success' });
    } else {
      return throwError('Payroll not found');
    }
  }




}
