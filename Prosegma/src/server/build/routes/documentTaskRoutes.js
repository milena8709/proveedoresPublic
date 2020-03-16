"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const proveedorController_1 = require("../controllers/proveedorController");
class DocumentTaskRoutes {
    constructor() {
        this.router = express_1.Router();
        console.log('ingreso al router DocumentTaskRoutes');
        this.config();
    }
    config() {
        this.router.post('', proveedorController_1.proveedorController.saveExistingTask);
        this.router.put('', proveedorController_1.proveedorController.updateTaskState);
        this.router.get('/:id', proveedorController_1.proveedorController.showRejectedDocuments);
    }
}
const documentTaskRoutes = new DocumentTaskRoutes();
exports.default = documentTaskRoutes.router;
