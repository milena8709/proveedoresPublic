"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarioController_1 = require("../controllers/usuarioController");
class UsuarioRoutes {
    constructor() {
        this.router = express_1.Router();
        console.log('ingreso al router usuarioRoutes');
        this.config();
    }
    config() {
        this.router.post('/', usuarioController_1.usuarioController.saveCuenta);
    }
}
const usuarioRoutes = new UsuarioRoutes();
exports.default = usuarioRoutes.router;
