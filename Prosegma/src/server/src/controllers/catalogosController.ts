import {Request, Response} from 'express';

import db from '../database';

class CatalagoController {

    public async list (req: Request, res: Response) {
        const usuarios = await db.query('SELECT * FROM catalogo');
        return res.json(usuarios);
    }

    public async getCatalogoById (req: Request, res: Response) {
        const { id } = req.params;
        console.log(id);
        const catalogo =  await db.query('SELECT * FROM catalogo where idcatalogo = ?', [id]);
        if (catalogo.length > 0) {
            return res.json(catalogo);
        }
        res.status(404).json({text: 'El catalogo no existe'});
    }


   public async create (req: Request, res: Response): Promise<void> {
        console.log(req.body);
        await db.query('INSERT INTO usuarios SET ?', [req.body]);
        res.json({text: 'Usuario guardado exitosamente'});
    }

   public delete (req: Request, res: Response) {
    res.json({text: 'eliminando usuario'});
}

public update (req: Request, res: Response) {
    res.json({text: 'actualizando usuario ' + req.params.id});
}
}

export const catalagoController = new CatalagoController();
