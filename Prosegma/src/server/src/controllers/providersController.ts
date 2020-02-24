import {Request, Response} from 'express';

import db from '../database';

class ProvidersController {


    public async getProveedorById (req: Request, res: Response) {
        const id  = req.params.id;
        const name  = req.params.name;
        console.log('id : ' + id);
        console.log('name : ' + name);
        console.log('Entra aqui');
        
        // const proveedor =  await db.query('SELECT * FROM proveedor WHERE idproveedor LIKE %?% AND razon_social LIKE %?%', [ id, name ]);
        const proveedor =  await db.query('SELECT * FROM proveedor WHERE idproveedor = 1 ');
        if (proveedor.length > 0) {
            return res.json(proveedor);
        }
        res.status(404).json({text: 'El proveedor no existe'});
    }



}

export const providersController = new ProvidersController();