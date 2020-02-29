"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transactionsController_1 = require("../controllers/transactionsController");
class TransactionsRoutes {
    constructor() {
        this.router = express_1.Router();
        console.log('ingreso al router evaluationController');
        this.config();
    }
    config() {
        this.router.get('/', transactionsController_1.transactionsController.getMaterials);
        this.router.get('/getMaterial/:segmento/:familia/:clase/:producto/', transactionsController_1.transactionsController.getMaterialsByFilters);
        this.router.get('/getTransaction', transactionsController_1.transactionsController.getTransactions);
        this.router.post('/', transactionsController_1.transactionsController.createTransaction);
        this.router.get('/getTransaction/:estado/:fecha_limite_entrega/:idproveedor/:id_orden_compra/', transactionsController_1.transactionsController.findTransactionByFilter);
        this.router.get('/getTransactionUpdate/:id', transactionsController_1.transactionsController.getTransactionToUpdate);
        this.router.put('/updateTransaction/:cantidad_recibida/:aprobacion_calidad/:observacion/:estado/:id_transaccion/:id_producto/', transactionsController_1.transactionsController.updateTransaction);
        // this.router.get('/id', evaluationController.getProveedorById);
        // this.router.post('/', evaluationController.createEvaluation);
        // this.router.put('/:id', camposProveedorController.update);
        // this.router.delete('/:id', camposProveedorController.delete);
    }
}
const transactionsRoutes = new TransactionsRoutes();
exports.default = transactionsRoutes.router;
