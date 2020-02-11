"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clasificacionController_1 = require("../controllers/clasificacionController");
class ClasificacionRoutes {
    constructor() {
        this.router = express_1.Router();
        console.log('ingreso al router camposProveedor');
        this.config();
    }
    config() {
        this.router.get('/', clasificacionController_1.clasificacionController.list);
        this.router.post('/', clasificacionController_1.clasificacionController.getClasificacionByFiltros);
        this.router.post('/save', clasificacionController_1.clasificacionController.saveClasificacion);
        this.router.put('/:id', clasificacionController_1.clasificacionController.update);
        this.router.delete('/:id', clasificacionController_1.clasificacionController.delete);
    }
}
const clasificacionRoutes = new ClasificacionRoutes();
exports.default = clasificacionRoutes.router;
