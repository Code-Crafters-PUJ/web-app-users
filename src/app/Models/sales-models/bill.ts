import { BillHasproduct } from "./billHasProduct";

export interface bill
{
    billNumber:number;
    date:Date;
    clientID:String
    billhasproduct:BillHasproduct[]
    withholdingtax:boolean
    chargetax:boolean
    branch_id:number
}