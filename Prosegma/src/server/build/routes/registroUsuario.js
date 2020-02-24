"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarioController_1 = require("../controllers/usuarioController");
class RegistroUsuario {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/:usuario/:password', usuarioController_1.usuarioController.getUsuario);
        /*  this.router.get('/', usuarioController.list);
          this.router.get('/:id', usuarioController.getUsuarioById);
          this.router.post('/', usuarioController.create);
          this.router.put('/:id', usuarioController.update);
          this.router.delete('/:id', usuarioController.delete);*/
    }
}
const registroUsuario = new RegistroUsuario();
exports.default = registroUsuario.router;
