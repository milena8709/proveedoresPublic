"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const proveedorController_1 = require("../controllers/proveedorController");
class BusquedaProveedorRoutes {
    constructor() {
        this.router = express_1.Router();
        console.log('ingreso al router BusquedaProveedorRoutes');
        this.config();
    }
    config() {
        this.router.post('', proveedorController_1.proveedorController.saveExistingTask);
        this.router.get('/:id', proveedorController_1.proveedorController.showRejectedDocuments);
    }
}
const busquedaProveedorRoutes = new BusquedaProveedorRoutes();
exports.default = busquedaProveedorRoutes.router;
