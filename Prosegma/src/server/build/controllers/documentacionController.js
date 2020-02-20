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
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
app.use(bodyParser.json());
class DocumentacionController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('listar usuarios documentacion');
            const usuarios = yield database_1.default.query('SELECT * FROM usuarios');
            return res.json(usuarios);
        });
    }
    getsolicitudCamposById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            console.log('consultar documentos' + id);
            const clasificiones = yield database_1.default.query('SELECT * FROM prosegma.clasificacion where idInscripcion  = ?', [id]);
            if (clasificiones.length > 0) {
                let documentos = [];
                console.log('tamdocumento' + documentos.length);
                for (const clasificacion of clasificiones) {
                    // if (clasificacion.codigoSegmento !== '') {
                    // tslint:disable-next-line: prefer-const
                    // tslint:disable-next-line: max-line-length
                    let sql = 'SELECT * FROM prosegma.solicitud_documentos where ';
                    if (clasificacion.codigoSegmento !== '') {
                        sql = sql + ' codigoSegmento = ' + clasificacion.codigoSegmento;
                    }
                    if (clasificacion.codigoFamilia !== '') {
                        sql = sql + ' OR codigoFamilia = ' + clasificacion.codigoFamilia;
                    }
                    if (clasificacion.codigoClase !== '') {
                        sql = sql + ' OR codigoClase = ' + clasificacion.codigoClase;
                    }
                    if (clasificacion.codigoProducto !== '') {
                        sql = sql + ' OR codigoProducto = ' + clasificacion.codigoProducto;
                    }
                    documentos = yield database_1.default.query(sql);
                }
                documentos = documentos.filter((valorActual, indiceActual, arreglo) => {
                    // tslint:disable-next-line: max-line-length
                    return arreglo.findIndex(valorDelArreglo => JSON.stringify(valorDelArreglo) === JSON.stringify(valorActual)) === indiceActual;
                });
                return res.json(documentos);
            }
            else {
                res.status(404).json({ text: 'No existen documentos configurados' });
            }
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
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('documentos', req.body[0]);
            const file = req.body;
            let idinscripcion;
            for (let index = 0; index < req.body.length; index++) {
                const element = req.body[index];
                if (element !== undefined) {
                    yield database_1.default.query('INSERT INTO documentos_inscripcion SET ?', [element]);
                    idinscripcion = element.id_inscripcion;
                    yield database_1.default.query('UPDATE proveedor SET estado = 2 WHERE idproveedor = (SELECT idproveedor as id FROM inscripcion where idinscripcion = ' + idinscripcion + ')');
                }
            }
            // tslint:disable-next-line: max-line-length
            res.json({ text: 'documentos_inscripcion guardado exitosamente' });
        });
    }
    delete(req, res) {
        res.json({ text: 'eliminando usuario' });
    }
    update(req, res) {
        res.json({ text: 'actualizando usuario ' + req.params.id });
    }
}
exports.documentacionController = new DocumentacionController();
