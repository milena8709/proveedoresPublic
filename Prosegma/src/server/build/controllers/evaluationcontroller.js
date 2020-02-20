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
            const usuarios = yield database_1.default.query('SELECT * FROM proveedor');
            return res.json(usuarios);
        });
    }

    getProveedorById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const name = req.params.name;
            console.log(req.params);
            const proveedor = yield database_1.default.query('SELECT * FROM proveedor where idproveedor = ? AND razon_social = ?', [id, name]);
            if (proveedor.length > 0) {
                return res.json(proveedor);
            }
            res.status(404).json({ text: 'El proveedor no existe' });
        });
    }

    createEvaluation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // tslint:disable-next-line: forin
            // const licitacion = { 'nombrelicitacion': req.body.licitacion};
            const titulo = req.body.tittle;
            const descripcion = req.body.description;
            const idProveedor = req.body.idProvider;
            console.log('CREATE EVALUATION ' + titulo + ' ' + descripcion + ' ' + idProveedor);
            // tslint:disable-next-line: max-line-length
            yield database_1.default.query('INSERT INTO evaluacion_proveedor (titulo,descripcion,id_proveedor) VALUES (?,?,?)', [titulo, descripcion, idProveedor]);
            res.json({ text: 'evaluacion guardado exitosamente' });
        });
    }
    
}
exports.evaluationController = new EvaluationController();
