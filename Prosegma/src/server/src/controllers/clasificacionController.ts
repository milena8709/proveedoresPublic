import {Request, Response} from 'express';

import db from '../database';
import { camposProveedorController } from './camposproveedorController';

class ClasificacionController {

    public async list (req: Request, res: Response) {
        const usuarios = await db.query('SELECT * FROM usuarios');
        return res.json(usuarios);
    }

    public async getClasificacionByFiltros (req: Request, res: Response) {
        console.log('consulta 1-- ');
        let sql = '';
        sql = 'select codigoSegmento, nombreSegmento, codigoFamilia, nombreFamilia, codigoclase, nombreClase, codigoproducto, nombreproducto from segmento ' +
        'inner join familia on  codigoSegmento = idSegmento ' +
        'inner join clase on idfamilia = codigoFamilia ' +
        'inner join producto on idclase = codigoclase where ';
        // tslint:disable-next-line: max-line-length
        if (req.body.segmento !== null && req.body.segmento !== '') {
            // tslint:disable-next-line: max-line-length
            sql += 'and nombreSegmento like "%' + req.body.segmento + '%"' + (req.body.segmento !== '' ? ' OR codigoSegmento = "' + req.body.segmento + '"' : ''); 
        }
        if (req.body.familia !== null && req.body.familia !== '') {
            // tslint:disable-next-line: max-line-length
            sql += 'and nombreFamilia like "%' + req.body.familia + '%"' + (req.body.familia !== '' ? ' OR codigoFamilia = "' + req.body.familia + '"' : '');
        }
        if (req.body.clase !== null && req.body.clase !== '') {
            // tslint:disable-next-line: max-line-length
            sql += 'and nombreClase like "%' + req.body.clase + '%"' + (req.body.clase !== '' ? ' OR codigoclase ="' + req.body.clase + '"' : '' );
        }
        if (req.body.producto !== null && req.body.producto !== '') {
            // tslint:disable-next-line: max-line-length
            sql += 'and nombreproducto like "%' + req.body.producto + '%"' + (req.body.producto !== '' ? ' OR codigoproducto ="' + req.body.producto  + '"' : '');
        }
        sql = sql.indexOf('where and') > 0 ? sql.replace('where and', 'where') : sql;
        console.log('consulta 2-- ' + sql);

        const clasificacion =  await db.query(sql);
         // tslint:disable-next-line: max-line-length
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

        res.json({text: 'clasificacion guardado exitosamente', id: id[0].id});
    }

   public delete (req: Request, res: Response) {
    res.json({text: 'eliminando usuario'});
}

public update (req: Request, res: Response) {
    res.json({text: 'actualizando usuario ' + req.params.id});
}
}

export const clasificacionController = new ClasificacionController();
