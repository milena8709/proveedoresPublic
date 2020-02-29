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
class ProvidersController {
    getProveedorById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            let name = req.params.name;
            if (name === ' ') {
                name = '';
            }
            if (id === ' ') {
                id = '';
            }
            console.log('id : ' + id);
            console.log('name : ' + name);
            console.log('Entra aqui');
            // const proveedor =  await db.query('SELECT * FROM proveedor WHERE idproveedor LIKE %?% AND razon_social LIKE %?%', [ id, name ]);
            // const proveedor =  await db.query(`SELECT * FROM proveedor WHERE idproveedor LIKE %?%`, [id] );
            const proveedor = yield database_1.default.query(`SELECT * FROM proveedor WHERE idproveedor LIKE '%${id}%' AND razon_social LIKE '%${name}%'`);
            if (proveedor.length > 0) {
                return res.json(proveedor);
            }
            return res.status(404).json({ text: 'El proveedor no existe' });
        });
    }
}
exports.providersController = new ProvidersController();
