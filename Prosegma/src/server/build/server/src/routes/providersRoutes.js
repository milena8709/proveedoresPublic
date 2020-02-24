"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const providersController_1 = require("../controllers/providersController");
class ProvidersRoutes {
    constructor() {
        this.router = express_1.Router();
        console.log('ingreso al router evaluationController');
        this.config();
    }
    config() {
        this.router.get('/:id/:name/', providersController_1.providersController.getProveedorById);
    }
}
const providersRoutes = new ProvidersRoutes();
exports.default = providersRoutes.router;
