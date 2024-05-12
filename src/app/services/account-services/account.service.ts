import { Injectable } from '@angular/core';
import {Plan} from "../../Models/user-models/plan";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {of} from "rxjs";
import {Company} from "../../models/user-models/company";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  plans: Plan[] = [
    {
      id: 1,
      type: 'Plan 1',
      price: 100,
      plan_description: 'Descripción 1',
      maxUsers: 10
    },
    {
      id: 2,
      type: 'Plan 2',
      price: 200,
      plan_description: 'Descripción 2',
      maxUsers: 20
    },
    {
      id: 3,
      type: 'Plan 3',
      price: 300,
      plan_description: 'Descripción 3',
      maxUsers: 30
    },
    {
      id: 4,
      type: 'Plan 4',
      price: 400,
      plan_description: 'Descripción 4',
      maxUsers: 40
    }
  ];

  companies : Company[] = [
    {
      id: 1,
      NIT: '800.328',
      name: 'empresa 1',
      businessArea: 'software',
      employeeNumber: 200,
      electronicPayroll: 928340,
      electronicBill: 2893749,
      planId: 1,
    },
    {
      id: 2,
      NIT: '800.329',
      name: 'empresa 2',
      businessArea: 'software',
      employeeNumber: 200,
      electronicPayroll: 928340,
      electronicBill: 2893749,
      planId: 2,
    },
    {
      id: 3,
      NIT: '800.330',
      name: 'empresa 3',
      businessArea: 'software',
      employeeNumber: 200,
      electronicPayroll: 928340,
      electronicBill: 2893749,
      planId: 3,
    },
    {
      id: 4,
      NIT: '800.331',
      name: 'empresa 4',
      businessArea: 'software',
      employeeNumber: 200,
      electronicPayroll: 928340,
      electronicBill: 2893749,
      planId: 4,
    },
    {
      id: 5,
      NIT: '800.332',
      name: 'empresa 5',
      businessArea: 'software',
      employeeNumber: 200,
      electronicPayroll: 928340,
      electronicBill: 2893749,
      planId: 1,
    }
    ];

  company: Company = {
    id: 0,
    NIT: '',
    name: '',
    businessArea: '',
    employeeNumber: 0,
    electronicPayroll: 0,
    electronicBill: 0,
    planId: 0,
  }
  plan: Plan = {
    id: 0,
    type: '',
    price: 0,
    plan_description: '',
    maxUsers: 0
  }

  constructor(
    private http: HttpClient
  ) { }

  getPlanByCompanyId(companyId: number):Observable<Plan> {
    let comp= this.companies.find(company => company.id === companyId);
    if(comp){
      this.company = comp;
    }
    let plan = this.plans.find(plan => plan.id === this.company.planId);
    if (plan){
      this.plan = plan;

    }
    return of(this.plan);
    //return this.http.get<Plan>(environment.baseURL + "/plan/" + companyId);
  }

  getAllPlans():Observable<Plan[]> {
    let plans: Plan[] = this.plans;
    //return this.http.get<Plan[]>(environment.baseURL + "/plans";
    return of(plans);

  }

  getCompanyById(companyId: number):Observable<any> {
    let company = this.companies.find(company => company.id === companyId);
    if(company){
      this.company = company;
    }
    return of(this.company);
    //return this.http.get<Company>(environment.baseURL + "/company/" + companyId);
  }

  getRootAccount(companyId: number):Observable<any> {
    let profile = {
      name: "Fabio",
      lastname:"Cuevas",
      phone:"3510020",
      email:"fabio@kajfn.jslf",
      password:"jsjdf",
      businessNit:"800.328",
      role:"Administrador"
    }
    return of(profile);
    //return this.http.get<Profile>(environment.baseURL + "/root/" + companyId);
  }
}
