import {Employee} from "./employee";

export interface Payroll {
  state:string;
  liquidationType: string;
  payrollName: string;
  month: string;
  year: number;
  employees: Employee[];
  totalIncome: number;
  totalDeductions: number;
  totalNet: number;
}
