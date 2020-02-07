import {Request, Response} from 'express';

import db from '../database';

class CamposProveedorController {

    public async list (req: Request, res: Response) {
        const usuarios = await db.query('SELECT * FROM usuarios');
        return res.json(usuarios);
    }

    public async getCamposById (req: Request, res: Response) {
        const { id } = req.params;
        console.log(id);
        const usuarios =  await db.query('SELECT * FROM camposproveedor where idproveedor = ?', [id]);
        if (usuarios.length > 0) {
            return res.json(usuarios);
        }
        res.status(404).json({text: 'El campo no existe'});
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

export const camposProveedorController = new CamposProveedorController();
