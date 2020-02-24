import { Datos } from './dato';
export interface Proveedor {

    idProveedor?: number;
    socialReason?: string;
    licitacion?: string;
    datos?: Datos[];
    documento?: Blob;
    enable?: boolean;
}
