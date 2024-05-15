import { branchOrder } from "../../models/Inventory/branchOrder";


export interface order{
  productName: string;
  supplierName: string;
  costPrice: number;
  purchaseDate: Date;
  branchOrders: branchOrder[];
}
