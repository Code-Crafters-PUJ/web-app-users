import {branchProductInventory} from "./branchProductInventory";

export interface branch{
  id: number;
  name: string;
  enabled: boolean;
  products: branchProductInventory[];
}
