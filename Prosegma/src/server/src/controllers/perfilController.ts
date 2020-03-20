import {Request, Response} from 'express';


import db from '../database';


class PerfilController {



    public async list (req: Request, res: Response) {
        const perfiles = await db.query('SELECT * FROM perfil');
        return res.json(perfiles);
    }
}

export const perfilController = new PerfilController();
