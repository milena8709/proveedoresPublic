"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const documentacionController_1 = require("../controllers/documentacionController");
class DocumentacionRoutes {
    constructor() {
        this.router = express_1.Router();
        console.log('ingreso al router camposProveedor');
        this.config();
    }
    config() {
        this.router.get('/', documentacionController_1.documentacionController.list);
        this.router.get('/:id', documentacionController_1.documentacionController.getCamposById);
        this.router.post('/', documentacionController_1.documentacionController.create);
        this.router.put('/:id', documentacionController_1.documentacionController.update);
        this.router.delete('/:id', documentacionController_1.documentacionController.delete);
    }
}
const documentacionRoutes = new DocumentacionRoutes();
exports.default = documentacionRoutes.router;
