"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const seleccionController_1 = require("../controllers/seleccionController");
class SaveSeleccionRoutes {
    constructor() {
        this.router = express_1.Router();
        console.log('ingreso al router camposProveedor');
        this.config();
    }
    config() {
        this.router.post('/', seleccionController_1.seleccionController.saveSeleccionProveedor);
        this.router.put('/:id', seleccionController_1.seleccionController.updateSeleccion);
    }
}
const saveSeleccionRoutes = new SaveSeleccionRoutes();
exports.default = saveSeleccionRoutes.router;
