import {Request, Response} from 'express';

import db from '../database';

class EvaluationController {

    public async list (req: Request, res: Response) {
        const proveedor = await db.query('SELECT * FROM proveedor');
        return res.json(proveedor);
    }

    public async getProveedorById (req: Request, res: Response) {
        const id  = req.params.id;
        const name  = req.params.name;
        console.log(req.params);
        const proveedor =  await db.query('SELECT * FROM proveedor where idproveedor = ? AND razon_social = ?', [id, name]);
        if (proveedor.length > 0) {
            return res.json(proveedor);
        }
        res.status(404).json({text: 'El proveedor no existe'});
    }

    public async createEvaluation (req: Request, res: Response): Promise<void> {

        // tslint:disable-next-line: forin
        // const licitacion = { 'nombrelicitacion': req.body.licitacion};
        const titulo  = req.body.tittle;
        const descripcion  = req.body.description;
        const idProveedor  = req.body.idProvider;
        // tslint:disable-next-line: max-line-length
        await db.query('INSERT INTO evaluacion_proveedor (titulo,descripcion,id_proveedor) VALUES (?,?,?)', [titulo, descripcion, idProveedor]);
        res.json({text: 'evaluacion guardado exitosamente'});
    }

}

export const evaluationController = new EvaluationController();