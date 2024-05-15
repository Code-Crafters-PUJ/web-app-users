import { product } from "../../models/Inventory/product"

export interface BillHasproduct
{
    billid:number
    product:product[]
    quantity:number
    unitPrice:number
    discount_percentage:number
}