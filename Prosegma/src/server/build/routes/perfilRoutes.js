"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const perfilController_1 = require("../controllers/perfilController");
class PerfilRoutes {
    constructor() {
        this.router = express_1.Router();
        console.log('ingreso al router perfilRoutes');
        this.config();
    }
    config() {
        this.router.get('/', perfilController_1.perfilController.list);
    }
}
const perfilRoutes = new PerfilRoutes();
exports.default = perfilRoutes.router;
