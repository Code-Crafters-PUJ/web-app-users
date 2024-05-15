import {product} from "../../models/Inventory/product";

export interface branchProductInventory {
  product: product;
  quantity: number;
  discount: number;
}
