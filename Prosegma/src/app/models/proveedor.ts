import { Datos } from './dato';
export interface Proveedor {

    idProveedor?: number;
    licitacion?: string;
    razonsocial?: string;
    identicicacion?: string;
    datos?: Datos[];
}
