import { Company } from "./company";
import { Role } from "./role";

export interface Account {
    id:number;
    email:string;
    password:string;
    id_card:string;
    last_connection:Date;
    connected:number;
    company: Company;
    roles: Role[]
}
