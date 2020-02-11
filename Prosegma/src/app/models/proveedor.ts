import { Datos } from './dato';
export interface Proveedor {

    idProveedor?: number;
    licitacion?: string;
    datos?: Datos[];
    documento: Blob;
}
