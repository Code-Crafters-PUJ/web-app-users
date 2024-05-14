import { Module } from "./module";
import { Permission } from "./permission";

export interface Role{
    id: number;
    name: string;
    module: Module;
    permissions:Permission[]
}