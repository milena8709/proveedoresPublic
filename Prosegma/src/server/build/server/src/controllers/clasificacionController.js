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
class ClasificacionController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarios = yield database_1.default.query('SELECT * FROM usuarios');
            return res.json(usuarios);
        });
    }
    getClasificacionByFiltros(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('consulta 1-- ' + req.body.segmento);
            const clasificacion = yield database_1.default.query('select codigoSegmento, nombreSegmento, codigoFamilia, nombreFamilia, codigoclase, nombreClase, codigoproducto, nombreproducto from segmento ' +
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
            res.status(404).json({ text: 'El campo no existe' });
        });
    }
    saveClasificacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = yield database_1.default.query('SELECT MAX(idinscripcion) as id FROM inscripcion');
            for (const dato of req.body) {
                // tslint:disable-next-line: max-line-length
                yield database_1.default.query('INSERT INTO clasificacion (codigoSegmento, codigoFamilia, codigoClase, codigoProducto, idInscripcion) values(' + dato.codigoSegmento + ',' + dato.codigoFamilia + ',' + dato.codigoclase + ',' + dato.codigoproducto + ',' + id[0].id + ')');
            }
            res.json({ text: 'clasificacion guardado exitosamente' });
        });
    }
    delete(req, res) {
        res.json({ text: 'eliminando usuario' });
    }
    update(req, res) {
        res.json({ text: 'actualizando usuario ' + req.params.id });
    }
}
exports.clasificacionController = new ClasificacionController();
