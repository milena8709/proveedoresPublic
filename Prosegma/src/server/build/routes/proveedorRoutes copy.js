"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const proveedorController_1 = require("../controllers/proveedorController");
class ProveedorRoutes {
    constructor() {
        this.router = express_1.Router();
        console.log('ingreso al router ProveedorRoutes');
        this.config();
    }
    config() {
        this.router.get('/:id', proveedorController_1.proveedorController.getProveedor);
    }
}
const proveedorRoutes = new ProveedorRoutes();
exports.default = proveedorRoutes.router;
