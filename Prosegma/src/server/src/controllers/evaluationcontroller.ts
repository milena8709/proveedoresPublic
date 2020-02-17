import {Request, Response} from 'express';

import db from '../database';

class EvaluationController{

    public async list (req: Request, res: Response) {
        const proveedor = await db.query('SELECT * FROM proveedor');
        return res.json(proveedor);
    }

}

export const evaluationController = new EvaluationController();