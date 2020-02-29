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
class SeleccionController {
    getCriterios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('listar Criterios');
            const criterios = yield database_1.default.query('SELECT * FROM criterios_seleccion');
            return res.json(criterios);
        });
    }
    getSeleccionProveedor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('getSeleccionProveedor', req.body);
            const { titulo } = req.body;
            const { descripcion } = req.body;
            const { segmento } = req.body;
            const { familia } = req.body;
            const { clase } = req.body;
            const { producto } = req.body;
            const { nit } = req.body;
            const { cotizacion } = req.body;
            console.log('consultar proveedores' + titulo + ' ' + descripcion + ' ' + segmento + ' ' + familia + ' ' + clase + ' ' + producto);
            let sql = 'select p.idproveedor as nit, p.razon_social as nombre from ' +
                'proveedor p ' +
                'inner join inscripcion i on  i.idproveedor = p.idproveedor ' +
                'inner join clasificacion c on c.idInscripcion = i.idInscripcion ' +
                'where';
            /*  if (titulo !== null && titulo !== '') {
                  sql += ' sp.titulo like \'%' + titulo + '%\'';
              }
              if (descripcion !== null && descripcion !== '') {
                  sql += ' and sp.descripcion like \'%' + descripcion + '%\'';
              }*/
            if (segmento !== null && segmento !== '') {
                sql += ' and c.codigoSegmento = (select codigoSegmento from segmento where codigoSegmento = "' + segmento + '" or nombreSegmento like \'%' + segmento + '%\')';
            }
            if (familia !== null && familia !== '') {
                sql += ' and c.codigoFamilia = (select codigoFamilia from familia where codigoFamilia = "' + familia + '" or nombreFamilia like \'%' + familia + '%\')';
            }
            if (clase !== null && clase !== '') {
                // tslint:disable-next-line: max-line-length
                sql += ' and c.codigoClase = (select codigoclase from clase where codigoclase = "' + clase + '" or nombreClase like \'%' + clase + '%\')';
            }
            if (producto !== null && producto !== '') {
                // tslint:disable-next-line: max-line-length
                sql += ' and c.codigoProducto = (select codigoproducto from producto where codigoproducto = "' + producto + '" or nombreproducto like \'%' + producto + '%\')';
            }
            if (nit !== null && nit !== '') {
                sql += ' and p.idproveedor = ' + nit;
            }
            if (cotizacion !== null && cotizacion !== '') {
                sql += ' and p.cotizacion = \'' + cotizacion + '\'';
            }
            sql = sql.indexOf('where and') > 0 ? sql.replace('where and', 'where') : sql;
            console.log('consulta 2-- ' + sql);
            return res.json(yield database_1.default.query(sql));
        });
    }
    getInscripcion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = yield database_1.default.query('SELECT MAX(idinscripcion) as id FROM inscripcion');
            if (id.length > 0) {
                return res.json(id);
            }
            res.status(404).json({ text: 'El campo no existe' });
        });
    }
    updateSeleccion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            console.log('update proveedor seleccionado', req.body);
            // tslint:disable-next-line: max-line-length
            for (let index = 0; index < req.body.length; index++) {
                const element = req.body[index];
                if (element !== undefined) {
                    // tslint:disable-next-line: max-line-length
                    // tslint:disable-next-line: max-line-length
                    yield database_1.default.query('UPDATE datos_seleccion set calificacion_proveedor = "' + element.porcentaje + '", ranking_proveedor = "' + (index + 1) + '" WHERE id_seleccion = ' + id + ' AND id_proveedor = ' + element.nit);
                    yield database_1.default.query('UPDATE proveedor set estado = "' + 3 + '" WHERE idproveedor = ' + element.nit);
                }
            }
            res.json({ text: 'eliminando usuario' });
        });
    }
    saveSeleccionProveedor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('proveedor seleccionado', req.body[0]);
            const file = req.body;
            // tslint:disable-next-line: max-line-length
            const idSeleccion = yield database_1.default.query('INSERT INTO seleccion_proveedor (titulo, descripcion, fecha_creacion) values("' + req.body[0].titulo + '","' + req.body[0].descripcion + '","' + req.body[0].fecha_creacion + '")');
            console.log('idSeleccion', idSeleccion.insertId);
            for (let index = 0; index < req.body.length; index++) {
                const element = req.body[index];
                if (element !== undefined) {
                    // tslint:disable-next-line: max-line-length
                    yield database_1.default.query('INSERT INTO datos_seleccion (id_seleccion, id_proveedor) values(' + idSeleccion.insertId + ',' + element.nit + ')');
                    yield database_1.default.query('UPDATE proveedor SET estado = 3 WHERE idproveedor = 1');
                }
            }
            // tslint:disable-next-line: max-line-length
            return res.json({ text: 'documentos_inscripcion guardado exitosamente', id: idSeleccion.insertId });
        });
    }
    delete(req, res) {
        res.json({ text: 'eliminando usuario' });
    }
    update(req, res) {
        res.json({ text: 'actualizando usuario ' + req.params.id });
    }
}
exports.seleccionController = new SeleccionController();
