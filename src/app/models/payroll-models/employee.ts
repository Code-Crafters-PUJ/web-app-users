import {Payroll} from "./payroll";
import {Contact} from "./contact";
import {Contract} from "./contract";
import {Education} from "./education";

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: string;
  typeCard: string;
  idCard: string;
  city: string;
  address: string;
  maritalStatus: string;
  phoneNumber: string;
  education: Education;
  companyId: number;
  contact: Contact;
  contract: Contract[];
}

