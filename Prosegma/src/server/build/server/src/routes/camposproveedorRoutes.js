"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const camposproveedorController_1 = require("../controllers/camposproveedorController");
class CamposProveedorRoutes {
    constructor() {
        this.router = express_1.Router();
        console.log('ingreso al router camposProveedor');
        this.config();
    }
    config() {
        this.router.get('/id', camposproveedorController_1.camposProveedorController.getCampos);
        this.router.post('/', camposproveedorController_1.camposProveedorController.create);
        this.router.put('/:id', camposproveedorController_1.camposProveedorController.update);
        this.router.delete('/:id', camposproveedorController_1.camposProveedorController.delete);
    }
}
const camposProveedorRoutes = new CamposProveedorRoutes();
exports.default = camposProveedorRoutes.router;
