
export interface Transaction {

    description?: string;
    fechalimite?: Date;
    idorden?: string;
    idproveedor?: string;
    rutaordencompra?: string;
    estado?: string;
    observacion?: string;
    materiales?: any[];
}