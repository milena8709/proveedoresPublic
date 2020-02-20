"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const criteriosController_1 = require("../controllers/criteriosController");
class CriteriosRoutes {
    constructor() {
        this.router = express_1.Router();
        console.log('ingreso al router criterioRoutes');
        this.config();
    }
    config() {
        this.router.get('/', criteriosController_1.criteriosController.getEvaluation);
    }
}
const criteriosRoutes = new CriteriosRoutes();
exports.default = criteriosRoutes.router;
