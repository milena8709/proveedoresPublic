
export interface Transaction {

    idTransaction?: string;
    description?: string;
    fechalimite?: Date;
    idorden?: string;
    idproveedor?: string;
    rutaordencompra?: string;
    estado?: string;
    observacion?: string;
    materiales?: any[];
}