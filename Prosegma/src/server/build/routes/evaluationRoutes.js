"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const evaluationcontroller_1 = require("../controllers/evaluationcontroller");
class EvaluationRoutes {
    constructor() {
        this.router = express_1.Router();
        console.log('ingreso al router evaluationController');
        this.config();
    }
    config() {
        this.router.get('/', evaluationcontroller_1.evaluationController.list);
        this.router.get('/:id/:name', evaluationcontroller_1.evaluationController.getProveedorById);
        this.router.post('/', evaluationcontroller_1.evaluationController.createEvaluation);
        /*this.router.put('/:id', camposProveedorController.update);
        this.router.delete('/:id', camposProveedorController.delete);*/
    }
}
const evaluationRoutes = new EvaluationRoutes();
exports.default = evaluationRoutes.router;
