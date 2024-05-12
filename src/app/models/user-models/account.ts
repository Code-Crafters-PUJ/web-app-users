import { Company } from "./company";
import { Profile } from "./profile";

export interface Account {
    id:number;
    email:string;
    password:string;
    id_card:string;
    last_connection:Date;
    connected:number;
    company: Company;
    profile: Profile;
}
