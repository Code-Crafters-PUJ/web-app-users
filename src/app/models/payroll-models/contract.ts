import {ContractType} from "./contractType";
import {Employee} from "./employee";

export interface Contract {
  id: number;
  contractType: ContractType;
  startDate: Date;
  endDate?: Date;
  duration: string;
  position: string;
  baseSalary: number;
  transportAllowance: boolean;
  healthAndPensions: boolean;
  severancePay: boolean;
  serviceBonus: boolean;
  totalSalary: number;
}

