"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const seleccionController_1 = require("../controllers/seleccionController");
class SeleccionRoutes {
    constructor() {
        this.router = express_1.Router();
        console.log('ingreso al router seleccionRoutes');
        this.config();
    }
    config() {
        this.router.post('/', seleccionController_1.seleccionController.getSeleccionProveedor);
        this.router.get('/', seleccionController_1.seleccionController.getCriterios);
    }
}
const seleccionRoutes = new SeleccionRoutes();
exports.default = seleccionRoutes.router;
