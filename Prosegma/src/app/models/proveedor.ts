import { Datos } from './dato';
export interface Proveedor {

    idProveedor?: number;
    socialReason?: string;
    licitacion?: string;
    razonsocial?: string;
    identicicacion?: string;
    datos?: Datos[];
    enable?: boolean;
}
