import { branchProductInventory } from "../../models/Inventory/branchProductInventory";


export interface branch{
  id: number;
  name: string;
  enabled: boolean;
  products: branchProductInventory[];
}
