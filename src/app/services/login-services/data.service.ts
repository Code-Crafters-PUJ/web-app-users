import { Injectable } from '@angular/core';
import { Company } from '../../models/user-models/company';
import { Account } from '../../models/user-models/account';
import { Plan } from '../../models/user-models/plan';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private company: Company | null = null;
  private account: Account | null = null;
  private plan: Plan | null = null;

  constructor() { }

  setCompany(company: Company): void {
    this.company = company;
  }

  getCompany(): Company | null {
    return this.company;
  }

  setAccount(account: Account): void {
    this.account = account;
  }

  getAccount(): Account | null {
    return this.account;
  }

  setPlan(plan: Plan): void {
    this.plan = plan;
  }

  getPlan(): Plan | null {
    return this.plan;
  }
  
}
