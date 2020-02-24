import {Request, Response} from 'express';

import db from '../database';

class EvaluationController {

    public async list (req: Request, res: Response) {
        console.log('-------------------');
        const proveedor = await db.query('SELECT * FROM proveedor WHERE estado="aprobado"');
        return res.json(proveedor);
    }

    /*public async getProveedorById (req: Request, res: Response) {
        const id  = req.params.id;
        const name  = req.params.name;
        console.log('id : ' + id);
        console.log('name : ' + name);
        console.log('Entra aqui');
        const proveedor =  await db.query('SELECT * FROM proveedor WHERE idproveedor LIKE %?% AND razon_social LIKE %?%', [ id, name ]);
        if (proveedor.length > 0) {
            return res.json(proveedor);
        }
        res.status(404).json({text: 'El proveedor no existe'});
    }*/

    public async createEvaluation (req: Request, res: Response): Promise<void> {
        // tslint:disable-next-line: forin
        const titulo  = req.body.tittle;
        const descripcion  = req.body.description;
        const idProveedor  = req.body.idProvider;
        const totalScore = req.body.totalScore;
        // tslint:disable-next-line: max-line-length
        await db.query('INSERT INTO evaluacion_proveedor (titulo,descripcion,id_proveedor,calificacion_total) VALUES (?,?,?,?)', [titulo, descripcion, idProveedor, totalScore]);
        const id_evaluacion =  await db.query('SELECT id FROM evaluacion_proveedor where titulo = ? AND descripcion = ? AND id_proveedor = ? AND calificacion_total = ?',[titulo, descripcion, idProveedor, totalScore]);
        console.log('evaluacion :: ' + JSON.stringify(id_evaluacion[0].id));
        console.log('criterios :: ' + req.body.criterios.length);
            for (let i = 0; i < req.body.criterios.length; i++) {
                const idCriterio = req.body.criterios[i].id;
                const scoreCriterio = req.body.data[i].scoreResult;
                console.log('criterios :: ' + idCriterio);
                console.log('criterios scoreCriterio :: ' + scoreCriterio);
                // tslint:disable-next-line: max-line-length
                await db.query('INSERT INTO datos_evaluacion (id_evaluacion,id_criterio,calificacion_criterio) VALUES (?,?,?)', [id_evaluacion[0].id, idCriterio, scoreCriterio]);
            }
        res.json({text: 'evaluacion guardado exitosamente'});
    }

    public async getEvaluation (req: Request, res: Response) {
        const id  = req.params.idProvider;
        const razon_social  = req.params.name;
        const year  = req.params.date;
        const semester = req.params.semester;
        console.log('id = ' + id + 'name = ' + razon_social + 'year = ' + year + 'semester = ' + semester);
        const proveedor =  await db.query('SELECT eva.titulo, eva.descripcion, cri.criterio, cri.peso, dat.calificacion_criterio, eva.fecha_creacion, pro.razon_social, pro.idproveedor, eva.calificacion_total, TRUNCATE(((MONTH(eva.fecha_creacion) - 1) / 6) + 1,0) AS semestre FROM prosegma.criterios_evaluacion cri, prosegma.datos_evaluacion dat, prosegma.evaluacion_proveedor eva, prosegma.proveedor pro HAVING pro.idproveedor LIKE %?% AND pro.razon_social LIKE %?% AND YEAR(eva.fecha_creacion) LIKE %?% AND semestre LIKE %?%', [id,razon_social,year,semester] );
        if (proveedor.length > 0) {
            return res.json(proveedor);
        }
        res.status(404).json({text: 'La evaluacion no existe'});
    }


}

export const evaluationController = new EvaluationController();