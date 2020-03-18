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
class UsuarioController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarios = yield database_1.default.query('SELECT u.nombres, u.apellidos, p.nombre as perfil FROM usuarios u INNER JOIN perfil p ON p.idperfil = u.idperfil');
            res.json(usuarios);
        });
    }
    getUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { usuario } = req.params;
            const { password } = req.params;
            console.log('usuario -', 'SELECT * FROM usuarios where usuario = "' + usuario + '" and clave = "' + password + '"');
            const usuarios = yield database_1.default.query('SELECT * FROM usuarios u INNER JOIN proveedor p on u.id_proveedor = p.idproveedor  where u.usuario = "' + usuario + '" and u.clave = "' + password + '"');
            if (usuarios.length > 0) {
                return res.json(usuarios[0]);
            }
            else {
                const user = yield database_1.default.query('SELECT * FROM usuarios where usuario = "' + usuario + '" and clave = "' + password + '"');
                if (user.length > 0) {
                    return res.json(user[0]);
                }
                else {
                    return res.status(404).json({ text: 'El usuario no existe, o sus credenciales no coinciden, por favor revise nuevamente' });
                }
            }
        });
    }
    getProveedorById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            console.log(id);
            const proveedor = yield database_1.default.query('SELECT * FROM proveedor p inner join usuarios u on u.id_proveedor = p.idproveedor where u.idusuario = ?', [id]);
            if (proveedor.length > 0) {
                return res.json(proveedor[0]);
            }
            res.status(404).json({ text: 'El usuario no existe' });
        });
    }
    CreateNewAccounten(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            // tslint:disable-next-line: max-line-length
            yield database_1.default.query('INSERT INTO usuarios (usuario, clave, idperfil, correo, nombres, apellidos) values ("' + req.body.usuario + '", "' + (Math.random() * (3 - 1) + 1) + '","' + req.body.perfil + '" , "' + req.body.correo + '", "' + req.body.nombre + '", "' + req.body.apellido + '")');
            const usuarios = yield database_1.default.query('SELECT u.nombres, u.apellidos, p.nombre as perfil FROM usuarios u INNER JOIN perfil p ON p.idperfil = u.idperfil');
            res.json(usuarios);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            // tslint:disable-next-line: max-line-length
            const proveedor = yield database_1.default.query('INSERT INTO proveedor (idproveedor, razon_social, estado) values ("' + req.body.nit + '","' + req.body.razon_social + '", "1")');
            console.log('proveedor insertado', proveedor);
            if (proveedor != null) {
                // tslint:disable-next-line: max-line-length
                yield database_1.default.query('INSERT INTO usuarios (usuario, clave, idperfil, id_proveedor, correo) values ("' + req.body.nit + '", "' + req.body.clave + '",1, "' + req.body.nit + '", "' + req.body.correo + '")');
            }
            res.json({ text: 'Usuario guardado exitosamente' });
        });
    }
    delete(req, res) {
        res.json({ text: 'eliminando usuario' });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idusuario } = req.params;
            console.log('UPDATE usuarios SET clave = "' + req.body.clave + '" WHERE id_proveedor = ' + idusuario);
            // tslint:disable-next-line: max-line-length
            const usuarios = yield database_1.default.query('UPDATE usuarios SET clave = "' + req.body.clave + '" WHERE idusuario = ' + idusuario);
            res.json({ text: 'Usuario actualizado' });
        });
    }
}
exports.usuarioController = new UsuarioController();
