"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const seleccionController_1 = require("../controllers/seleccionController");
class SeleccionRoutes {
    constructor() {
        this.router = express_1.Router();
        console.log('ingreso al router camposProveedor');
        this.config();
    }
    config() {
        this.router.post('/', seleccionController_1.seleccionController.getSeleccionProveedor);
        this.router.post('/', seleccionController_1.seleccionController.saveSeleccionProveedor);
    }
}
const seleccionRoutes = new SeleccionRoutes();
exports.default = seleccionRoutes.router;
