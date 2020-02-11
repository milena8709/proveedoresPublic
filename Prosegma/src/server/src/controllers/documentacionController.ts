import {Request, Response} from 'express';

import db from '../database';

class DocumentacionController {

    public async list (req: Request, res: Response) {
        const usuarios = await db.query('SELECT * FROM usuarios');
        return res.json(usuarios);
    }

    public async getCamposById (req: Request, res: Response) {
        const { id } = req.params;
        console.log('consultar documentos' + id);
        const documentos =  await db.query('SELECT * FROM documentos where idclasificacion = ?', [id]);
        if (documentos.length > 0) {
            return res.json(documentos);
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
        console.log(req.body);
        // tslint:disable-next-line: max-line-length
        const id =  await db.query('SELECT MAX(idinscripcion) as id FROM inscripcion');
        await db.query('INSERT INTO datos (documento, idinscripcion) values (' + req.body.file + ', ' + id + ') where ');
        res.json({text: 'Usuario guardado exitosamente'});
    }

   public delete (req: Request, res: Response) {
    res.json({text: 'eliminando usuario'});
}

public update (req: Request, res: Response) {
    res.json({text: 'actualizando usuario ' + req.params.id});
}
}

export const documentacionController = new DocumentacionController();
