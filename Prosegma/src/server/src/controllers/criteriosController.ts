import {Request, Response} from 'express';

import db from '../database';

class CriteriosController {

    public async getEvaluation (req: Request, res: Response) {
        const criterios = await db.query('SELECT * FROM criterios_evaluacion');
        return res.json(criterios);
    }
}

export const criteriosController = new CriteriosController();