import {Injectable} from '@angular/core';
import {Plan} from "../../models/user-models/plan";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {of} from "rxjs";
import {Company} from "../../models/user-models/company";
import {Account} from "../../models/user-models/account";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  plans: Plan[] = [
    {
      id: 1,
      type: 'Plan 1',
      mensual_price: 100,
      semestral_price: 500,
      anual_price: 1000,
      plan_description: 'Descripción 1',
      maxUsers: 10
    },
    {
      id: 2,
      type: 'Plan 2',
      mensual_price: 200,
      semestral_price: 1000,
      anual_price: 2000,
      plan_description: 'Descripción 2',
      maxUsers: 20
    },
    {
      id: 3,
      type: 'Plan 3',
      mensual_price: 300,
      semestral_price: 1500,
      anual_price: 3000,
      plan_description: 'Descripción 3',
      maxUsers: 30
    },
    {
      id: 4,
      type: 'Plan 4',
      mensual_price: 400,
      semestral_price: 2000,
      anual_price: 4000,
      plan_description: 'Descripción 4',
      maxUsers: 40
    }
  ];

  companies: any[] = [
    {
      id: 1,
      NIT: '800.328',
      name: 'empresa 1',
      businessArea: 'software',
      employeeNumber: 200,
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
  branches = [
    {
      id: 1,
      name: 'sucursal 1',
      address: 'calle 1',

    },
    {
      id: 2,
      name: 'sucursal 2',
      address: 'calle 2',
    },
    {
      id: 3,
      name: 'sucursal 3',
      address: 'calle 3',
    },
    {
      id: 4,
      name: 'sucursal 4',
      address: 'calle 4',
    },
    {
      id: 5,
      name: 'sucursal 5',
      address: 'calle 5',
    },
  ];

  company: any = {
    id: 0,
    NIT: '',
    name: '',
    businessArea: '',
    employeeNumber: 0,
    planId: 0,
  }
  plan: Plan = {
    id: 0,
    type: '',
    mensual_price: 0,
    semestral_price: 0,
    anual_price: 0,
    plan_description: '',
    maxUsers: 0
  }

  historic: any[] = [
    {
      id: 1,
      initial_date: '2021-01-01',
      final_date: '2021-01-31',
      amount: 100,
      active: true,
      payment_date: '2021-01-01',
      payment_method: 'tarjeta de credito',
      plan: 'Plan 1'
    },
    {
      id: 2,
      initial_date: '2021-02-01',
      final_date: '2021-02-28',
      amount: 100,
      active: true,
      payment_date: '2021-02-01',
      payment_method: 'tarjeta de credito',
      plan: 'Plan 1'
    },
    {
      id: 3,
      initial_date: '2021-03-01',
      final_date: '2021-03-31',
      amount: 100,
      active: true,
      payment_date: '2021-03-01',
      payment_method: 'tarjeta de credito',
      plan: 'Plan 1'
    },
    {
      id: 4,
      initial_date: '2021-04-01',
      final_date: '2021-04-30',
      amount: 100,
      active: true,
      payment_date: '2021-04-01',
      payment_method: 'tarjeta de credito',
      plan: 'Plan 2'
    },
    {
      id: 5,
      initial_date: '2021-05-01',
      final_date: '2021-05-31',
      amount: 100,
      active: true,
      payment_date: '2021-05-01',
      payment_method: 'tarjeta de credito',
      plan: 'Plan 2'
    }
  ];

  constructor(
    private http: HttpClient
  ) {
  }

  getPlanByCompanyId(companyId: number): Observable<Plan> {
    let comp = this.companies.find(company => company.id === companyId);
    if (comp) {
      this.company = comp;
    }
    let plan = this.plans.find(plan => plan.id === this.company.planId);
    if (plan) {
      this.plan = plan;

    }
    return of(this.plan);
    //return this.http.get<Plan>(environment.baseURL + "/plan/" + companyId);
  }

  getAllPlans(): Observable<Plan[]> {
    let plans: Plan[] = this.plans;
    //return this.http.get<Plan[]>(environment.baseURL + "/plans";
    return of(plans);

  }

  getCompanyById(companyId: number): Observable<any> {
    let company = this.companies.find(company => company.id === companyId);
    if (company) {
      this.company = company;
    }
    return of(this.company);
    //return this.http.get<Company>(environment.baseURL + "/company/" + companyId);
  }

  getRootAccount(companyId: number): Observable<any> {
    let profile = {
      name: "Fabio",
      lastname: "Cuevas",
      typeCardId: "C.C",
      cardId: "123456",
      phone: "3510020",
      email: "fabio@kajfn.jslf",
      password: "jsjdf",
      businessNit: "800.328",
      role: "Administrador"
    }
    return of(profile);
    //return this.http.get<Profile>(environment.baseURL + "/root/" + companyId);
  }

  getAllBranchesByCompany(companyId: number): Observable<any> {

    return of(this.branches);
  }

  changePassword(companyId: number, newPassword: string, actualPassword: string): Observable<any> {
    let okActualPassword = false;
    //answer = this.http.post(environment.baseURL + "/changePassword", {companyId, newPassword, actualPassword});
    return of(true);
  }

  deleteBranch(id: number, companyId: number): Observable<any> {
    this.branches.splice(this.branches.findIndex(branch => branch.id === id), 1);
    return of(true);
  }

  generatebranchId(companyId: number) {
    return this.branches.length + 1;
  }

  companyNitExists(NIT: number, companyId: number) {
    let company = this.companies.find(company => company.NIT === NIT && company.id !== companyId);
    if (company) {
      return of(true);
    }
    return of(false);
  }

  updateCompany(company: {
    businessArea: string;
    NIT: number;
    name: string;
    planId: number;
    id: number;
    employeeNumber: number
  }) {
    //Replace th company searching by id or nit
    let companyIndex = this.companies.findIndex(comp => comp.id === company.id);
    if (companyIndex === -1) {
      companyIndex = this.companies.findIndex(comp => comp.NIT === company.NIT);
    }
    this.companies[companyIndex] = company;
    return of(true);
  }

  updateRootAccount(rootProfile: {
    password: string;
    role: string;
    phone: string;
    cardId: string;
    name: string;
    typeCardId: string;
    email: string;
    businessNit: string;
    lastname: string
  }) {
    return of(true);
  }

  updateBranches(branches: { address: string; name: string; id: number }[], companyId: number) {
    branches.forEach(newBranch => {
      let existingBranch = this.branches.find(branch => branch.id === newBranch.id);
      if (existingBranch) {
        console.log('Updating branch');
        console.log(existingBranch);
        existingBranch.address = newBranch.address;
        existingBranch.name = newBranch.name;
        console.log(existingBranch);
      } else {
        // Add new branch
        console.log('Adding new branch');
        console.log(newBranch);
        this.branches.push(newBranch);
      }
    });
    return of(true);
  }

  getHistoricByCompanyId(companyId: number) {

    return of(this.historic);
  }

  getAllAccounts(companyId: number) {
    let accounts = [
      {
        email: 'kadjf@kjsdn',
        password: 'jsnkdjnewrk4j',
        name: 'Fabio',
        lastname: 'cuellar',
        phone: '284',
        type_id_card: 'C.C',
        id_card: '29384932',
        company_NIT: 1,
        role: 'vendedor',
      },
      {
        email: 'kadjf@kjsdn',
        password: 'jsnkdjnewrk4j',
        name: 'Fabio',
        lastname: 'cuellar',
        phone: '284',
        type_id_card: 'C.C',
        id_card: '29384932',
        company_NIT: 1,
        role: 'contador',
      },
      {
        email: 'kadjf@kjsdn',
        password: 'jsnkdjnewrk4j',
        name: 'Fabio',
        lastname: 'cuellar',
        phone: '284',
        type_id_card: 'C.C',
        id_card: '29384932',
        company_NIT: 1,
        role: 'logistico',
      },
      {
        email: 'kadjf@kjsdn',
        password: 'jsnkdjnewrk4j',
        name: 'Fabio',
        lastname: 'cuellar',
        phone: '284',
        type_id_card: 'C.C',
        id_card: '29384932',
        company_NIT: 1,
        role: 'vendedor',
      },
      {
        email: 'kadjf@kjsdn',
        password: 'jsnkdjnewrk4j',
        name: 'Fabio',
        lastname: 'cuellar',
        phone: '284',
        type_id_card: 'C.C',
        id_card: '29384932',
        company_NIT: 1,
        role: 'contador',
      },
      {
        email: 'kadjf@kjsdn',
        password: 'jsnkdjnewrk4j',
        name: 'Fabio',
        lastname: 'cuellar',
        phone: '284',
        type_id_card: 'C.C',
        id_card: '29384932',
        company_NIT: 1,
        role: 'logistico',
      },
      {
        email: 'kadjf@kjsdn',
        password: 'jsnkdjnewrk4j',
        name: 'Fabio',
        lastname: 'cuellar',
        phone: '284',
        type_id_card: 'C.C',
        id_card: '29384932',
        company_NIT: 1,
        role: 'vendedor',
      },
      {
        email: 'kadjf@kjsdn',
        password: 'jsnkdjnewrk4j',
        name: 'Fabio',
        lastname: 'cuellar',
        phone: '284',
        type_id_card: 'C.C',
        id_card: '29384932',
        company_NIT: 1,
        role: 'vendedor',
      },
      {
        email: 'kadjf@kjsdn',
        password: 'jsnkdjnewrk4j',
        name: 'Fabio',
        lastname: 'cuellar',
        phone: '284',
        type_id_card: 'C.C',
        id_card: '29384932',
        company_NIT: 1,
        role: 'vendedor',
      },
      {
        email: 'kadjf@kjsdn',
        password: 'jsnkdjnewrk4j',
        name: 'Fabio',
        lastname: 'cuellar',
        phone: '284',
        type_id_card: 'C.C',
        id_card: '29384932',
        company_NIT: 1,
        role: 'vendedor',
      },
      {
        email: 'kadjf@kjsdn',
        password: 'jsnkdjnewrk4j',
        name: 'Fabio',
        lastname: 'cuellar',
        phone: '284',
        type_id_card: 'C.C',
        id_card: '29384932',
        company_NIT: 1,
        role: 'vendedor',
      }

    ];
    return of(accounts);

  }

  getPermissions() {
    let permissions = [
      {
        id: 1,
        name: 'vendedor',
        description: 'vende'
      },
      {
        id: 2,
        name: 'contador',
        description: 'cuenta'
      },
      {
        id: 3,
        name: 'logistico',
        description: 'entrega'
      }
    ];
    return of(permissions);
  }

  getAllModulesByCompany(companyId: number) {
    let modules = [
      {
        name: 'ventas',
      },
      {
        name: 'contabilidad',
      },
      {
        name: 'logistica',
      }
    ];
    return of(modules);
  }

  createAccount(account: Account, modules: any[]) {
    return of(true);
  }

  verifyCardIdExists(id_card: string) {
    return of(false);
  }

  verifyEmailExists(email: string) {
    return of(false);
  }

  getTemporalPassword() {
    let regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    let password = 'Aa123456';
    return of(password);
  }

  updateAccount(account: Account, modules: any[]) {
    return of(true);

  }

  verifyCardIdExistsOnEdit(id_card: string, userId: number) {
    return of(false);

  }

  verifyEmailExistsOnEdit(email: string, userId: number) {
    return of(false);
  }

  getAccountById(id: number) {
    return of({
      email: 'kadjf@kjsdn',
      password: 'jsnkdjnewrk4j',
      name: 'Fabio',
      lastname: 'cuellar',
      phone: '284',
      type_id_card: 'C.C',
      id_card: '29384932',
      company_NIT: 1,
      role: 'vendedor',
    });
  }

  deleteAccount(id_card: string) {
    return of(true);
  }
}
