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
}

