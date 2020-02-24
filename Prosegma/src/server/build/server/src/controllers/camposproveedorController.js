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
class CamposProveedorController {
    getCampos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('get campos');
            const campos = yield database_1.default.query('SELECT * FROM camposproveedor');
            if (campos.length > 0) {
                return res.json(campos);
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
            yield database_1.default.query('INSERT INTO inscripcion SET ?', [{ 'idProveedor': req.body.idProveedor }]);
            const id = yield database_1.default.query('SELECT MAX(idinscripcion) as id FROM inscripcion');
            for (const dato of req.body.datos) {
                console.log('dato' + dato);
                dato.inscripcion = id;
                yield database_1.default.query('INSERT INTO datos SET ?', [dato]);
            }
            //  const licitacion = { 'nombrelicitacion': req.body.licitacion};
            //  await db.query('INSERT INTO licitacion SET ?', [licitacion]);
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
exports.camposProveedorController = new CamposProveedorController();
