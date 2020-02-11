"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const catalogosController_1 = require("../controllers/catalogosController");
class CamposProveedorRoutes {
    constructor() {
        this.router = express_1.Router();
        console.log('ingreso al router catalogos');
        this.config();
    }
    config() {
        //     this.router.get('/', catalagoController.getCatalogoById);
        this.router.get('/:id', catalogosController_1.catalagoController.getCatalogoById);
        //        this.router.post('/', camposProveedorController.create);
        //        this.router.put('/:id', camposProveedorController.update);
        //        this.router.delete('/:id', camposProveedorController.delete);
    }
}
const camposProveedorRoutes = new CamposProveedorRoutes();
exports.default = camposProveedorRoutes.router;
