import {ContractType} from "./contractType";
import {Employee} from "./employee";

export interface Contract {
  id: number;
  number: string;
  startDate: Date;
  endDate: Date;
  employee: Employee;
  contractType: ContractType;
  baseSalary: number;
  transportAllowance: boolean;
  healthAndPensions: boolean;
  severancePay: boolean;
  serviceBonus: boolean;
  totalSalary: number;

}

