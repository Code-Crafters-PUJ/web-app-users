import {branchOrder} from "./branchOrder";

export interface order{
  productName: string;
  supplierName: string;
  costPrice: number;
  purchaseDate: Date;
  branchOrders: branchOrder[];
}
