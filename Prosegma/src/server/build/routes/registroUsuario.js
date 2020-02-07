"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class RegistroUsuario {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        /*  this.router.get('/', usuarioController.list);
          this.router.get('/:id', usuarioController.getUsuarioById);
          this.router.post('/', usuarioController.create);
          this.router.put('/:id', usuarioController.update);
          this.router.delete('/:id', usuarioController.delete);*/
    }
}
const registroUsuario = new RegistroUsuario();
exports.default = registroUsuario.router;
