import {Payroll} from "./payroll";
import {Contact} from "./contact";
import {Contract} from "./contract";
import {Education} from "./education";

export interface Employee {
  id: number;
  idCard: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  address: string;
  city: string;
  education: Education;
  companyId: number;
  contact: Contact;
  contract: Contract[];
}

