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
class DocumentacionController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('listar usuarios documentacion');
            const usuarios = yield database_1.default.query('SELECT * FROM usuarios');
            return res.json(usuarios);
        });
    }
    getCamposById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            console.log('consultar documentos' + id);
            const documentos = yield database_1.default.query('SELECT * FROM documentos where idclasificacion = ?', [id]);
            if (documentos.length > 0) {
                return res.json(documentos);
            }
            res.status(404).json({ text: 'El campo no existe' });
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
            console.log(req.body);
            // tslint:disable-next-line: max-line-length
            const id = yield database_1.default.query('SELECT MAX(idinscripcion) as id FROM inscripcion');
            yield database_1.default.query('INSERT INTO datos (documento, idinscripcion) values (' + req.body.file + ', ' + id + ') where ');
            res.json({ text: 'Usuario guardado exitosamente' });
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
