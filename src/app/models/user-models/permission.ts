import {Module} from './module';

export interface Permission{
    id: number;
    permise: string;
    module: Module;
}
