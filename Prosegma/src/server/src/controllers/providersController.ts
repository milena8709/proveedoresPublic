import {Request, Response} from 'express';

import db from '../database';

class ProvidersController {


    public async getProveedorById (req: Request, res: Response) {
        let id  = req.params.id;
        let name  = req.params.name;
        if ( name === ' ') {
            name = '';
        }
        if ( id === ' ' ) {
            id = '';
        }
        console.log('id : ' + id);
        console.log('name : ' + name);
        console.log('Entra aqui');
        // const proveedor =  await db.query('SELECT * FROM proveedor WHERE idproveedor LIKE %?% AND razon_social LIKE %?%', [ id, name ]);
        // const proveedor =  await db.query(`SELECT * FROM proveedor WHERE idproveedor LIKE %?%`, [id] );
        const proveedor =  await db.query(`SELECT * FROM proveedor WHERE idproveedor LIKE '%${id}%' AND razon_social LIKE '%${name}%'`);
        if (proveedor.length > 0) {
            return res.json(proveedor);
        }
        return res.status(404).json({text: 'El proveedor no existe'});
    }



}

export const providersController = new ProvidersController();