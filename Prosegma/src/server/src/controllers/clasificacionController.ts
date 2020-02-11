import {Request, Response} from 'express';

import db from '../database';
import { camposProveedorController } from './camposproveedorController';

class ClasificacionController {

    public async list (req: Request, res: Response) {
        const usuarios = await db.query('SELECT * FROM usuarios');
        return res.json(usuarios);
    }

    public async getClasificacionByFiltros (req: Request, res: Response) {
        console.log('consulta 1-- ' + req.body.segmento);

        const clasificacion =  await db.query('select codigoSegmento, nombreSegmento, codigoFamilia, nombreFamilia, codigoclase, nombreClase, codigoproducto, nombreproducto from segmento ' +
        'inner join familia on  codigoSegmento = idSegmento ' +
        'inner join clase on idfamilia = codigoFamilia ' +
        'inner join producto on idclase = codigoclase ' +
        'where nombreSegmento like "%' + req.body.segmento + '%" ' +
         'and nombreFamilia like "%' + req.body.familia + '%" ' +
         'and nombreClase like "%' + req.body.clase + '%" ' +
         'and nombreproducto like "%' + req.body.producto + '%" ');
        if (clasificacion.length > 0) {
            return res.json(clasificacion);
        }
        res.status(404).json({text: 'El campo no existe'});
    }

   public async saveClasificacion (req: Request, res: Response): Promise<void> {
    const id =  await db.query('SELECT MAX(idinscripcion) as id FROM inscripcion');
       for (const dato of req.body) {
            // tslint:disable-next-line: max-line-length
         await db.query('INSERT INTO clasificacion (codigoSegmento, codigoFamilia, codigoClase, codigoProducto, idInscripcion) values(' + dato.codigoSegmento + ',' + dato.codigoFamilia + ',' + dato.codigoclase + ',' + dato.codigoproducto + ',' + id[0].id + ')');
        }

        res.json({text: 'clasificacion guardado exitosamente'});
    }

   public delete (req: Request, res: Response) {
    res.json({text: 'eliminando usuario'});
}

public update (req: Request, res: Response) {
    res.json({text: 'actualizando usuario ' + req.params.id});
}
}

export const clasificacionController = new ClasificacionController();
