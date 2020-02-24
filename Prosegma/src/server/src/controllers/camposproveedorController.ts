import {Request, Response} from 'express';

import db from '../database';

class CamposProveedorController {


    public async getCampos (req: Request, res: Response) {
        console.log('get campos');
        const campos =  await db.query('SELECT * FROM camposproveedor');
        if (campos.length > 0) {
            return res.json(campos);
        }
        res.status(404).json({text: 'El campo no existe'});
    }


    public async getInscripcion (req: Request, res: Response) {
        const id =  await db.query('SELECT MAX(idinscripcion) as id FROM inscripcion');
        if (id.length > 0) {
            return res.json(id);
        }
        res.status(404).json({text: 'El campo no existe'});
    }


   public async create (req: Request, res: Response): Promise<void> {

    console.log('dato-' + req.body.datos);
        await db.query('INSERT INTO inscripcion SET ?', [{'idProveedor': req.body.idProveedor}]);
        const id =  await db.query('SELECT MAX(idinscripcion) as id FROM inscripcion');
        for (const dato of req.body.datos) {
            dato.idinscripcion = id[0].id;
           console.log('INSERT INTO datos SET ?', [dato]);
            await db.query('INSERT INTO datos SET ?', [dato]);
        }
      //  const licitacion = { 'nombrelicitacion': req.body.licitacion};
      //  await db.query('INSERT INTO licitacion SET ?', [licitacion]);

        res.json({text: 'Usuario guardado exitosamente'});
    }

   public delete (req: Request, res: Response) {
    res.json({text: 'eliminando usuario'});
}

public update (req: Request, res: Response) {
    res.json({text: 'actualizando usuario ' + req.params.id});
}
}

export const camposProveedorController = new CamposProveedorController();
