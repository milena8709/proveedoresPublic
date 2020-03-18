"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class EvaluationController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('-------------------');
            const proveedor = yield database_1.default.query('SELECT * FROM proveedor WHERE estado="aprobado"');
            return res.json(proveedor);
        });
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
    createEvaluation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // tslint:disable-next-line: forin
            const titulo = req.body.tittle;
            const descripcion = req.body.description;
            const idProveedor = req.body.idProvider;
            const totalScore = req.body.totalScore;
            // tslint:disable-next-line: max-line-length
            yield database_1.default.query('INSERT INTO evaluacion_proveedor (titulo,descripcion,id_proveedor,calificacion_total) VALUES (?,?,?,?)', [titulo, descripcion, idProveedor, totalScore]);
            const id_evaluacion = yield database_1.default.query('SELECT id FROM evaluacion_proveedor where titulo = ? AND descripcion = ? AND id_proveedor = ? AND calificacion_total = ?', [titulo, descripcion, idProveedor, totalScore]);
            console.log('evaluacion :: ' + JSON.stringify(id_evaluacion[0].id));
            console.log('criterios :: ' + req.body.criterios.length);
            for (let i = 0; i < req.body.criterios.length; i++) {
                const idCriterio = req.body.criterios[i].id;
                const scoreCriterio = req.body.data[i].scoreResult;
                console.log('criterios :: ' + idCriterio);
                console.log('criterios scoreCriterio :: ' + scoreCriterio);
                // tslint:disable-next-line: max-line-length
                yield database_1.default.query('INSERT INTO datos_evaluacion (id_evaluacion,id_criterio,calificacion_criterio) VALUES (?,?,?)', [id_evaluacion[0].id, idCriterio, scoreCriterio]);
            }
            res.json({ text: 'evaluacion guardado exitosamente' });
        });
    }
    getEvaluation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('-----------------');
            let id = req.params.id;
            if (id === ' ') {
                id = '';
            }
            let razon_social = req.params.razon_social;
            if (razon_social === ' ') {
                razon_social = '';
            }
            let year = req.params.year;
            if (year === ' ') {
                year = '';
            }
            let semester = req.params.semester;
            if (semester === ' ') {
                semester = '';
            }
            console.log('id = ' + id + 'name = ' + razon_social + 'year = ' + year + 'semester = ' + semester);
            const proveedor = yield database_1.default.query(`SELECT eva.titulo, eva.descripcion, cri.criterio, cri.peso, dat.calificacion_criterio, eva.fecha_creacion, pro.razon_social, pro.idproveedor, eva.calificacion_total, IF(MONTH(eva.fecha_creacion) < 7, 1, 2) semester FROM datos_evaluacion dat INNER JOIN evaluacion_proveedor eva, proveedor pro, criterios_evaluacion cri WHERE dat.id_evaluacion = eva.id AND eva.id_proveedor = pro.idproveedor AND dat.id_criterio = cri.id AND eva.id_proveedor LIKE '%${id}%' AND  pro.razon_social LIKE '%${razon_social}%' AND YEAR(eva.fecha_creacion) LIKE '%${year}%' GROUP BY eva.id_proveedor HAVING semester LIKE '%${semester}%'`);
            if (proveedor.length > 0) {
                return res.json(proveedor);
            }
            return res.status(404).json({ text: 'La evaluacion no existe' });
        });
    }
    getEvaluationByDetail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('-----------------');
            let id = req.params.id;
            if (id === ' ') {
                id = '';
            }
            let titulo = req.params.titulo;
            if (titulo === ' ') {
                titulo = '';
            }
            let year = req.params.year;
            if (year === ' ' || year === null) {
                year = '';
            }
            console.log('id = ' + id + 'name = ' + titulo + 'year = ' + year);
            const proveedor = yield database_1.default.query(`SELECT eva.titulo, eva.descripcion, cri.criterio, cri.peso, dat.calificacion_criterio, eva.fecha_creacion, pro.razon_social, pro.idproveedor, eva.calificacion_total, eva.fecha_creacion, IF((dat.calificacion_criterio) < 4, 'Bajo Rendimiento', IF((dat.calificacion_criterio) BETWEEN 5 AND 8  ,'Rendimiento Medio','Alto Rendimiento')) AS mensaje,IF((eva.calificacion_total) < 4, 'Bajo Rendimiento', IF((eva.calificacion_total) BETWEEN 5 AND 8  ,'Rendimiento Medio','Alto Rendimiento')) AS mensajeTotal FROM datos_evaluacion dat INNER JOIN evaluacion_proveedor eva, proveedor pro, criterios_evaluacion cri WHERE dat.id_evaluacion = eva.id AND eva.id_proveedor = pro.idproveedor AND dat.id_criterio = cri.id AND eva.id_proveedor LIKE '%${id}%' AND  eva.titulo LIKE '%${titulo}%' AND YEAR(eva.fecha_creacion) LIKE '%${year}%' GROUP BY cri.criterio`);
            if (proveedor.length > 0) {
                return res.json(proveedor);
            }
            return res.status(404).json({ text: 'La evaluacion no existe' });
        });
    }
}
exports.evaluationController = new EvaluationController();
