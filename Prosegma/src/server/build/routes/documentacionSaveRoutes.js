"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const documentacionController_1 = require("../controllers/documentacionController");
const express = require('express');
const bodyParser = require('body-parser');
const multipart = require('connect-multiparty');
const app = express();
app.use(bodyParser.json());
class DocumentacionSaveRoutes {
    constructor() {
        this.router = express_1.Router();
        this.multipartMidlewaren = multipart({
            uploadDir: './files'
        });
        console.log('ingreso al router documentacion');
        this.config();
    }
    config() {
        this.router.get('/', documentacionController_1.documentacionController.list);
        this.router.get('/:id/:estado', documentacionController_1.documentacionController.getsolicitudCamposById);
        this.router.put('/:id', documentacionController_1.documentacionController.update);
        this.router.delete('/:id', documentacionController_1.documentacionController.delete);
        this.router.post('/', documentacionController_1.documentacionController.create);
        /*this.router.post('/', this.multipartMidlewaren, (req, res) => {
         const file = req.body.file;
         const name = req.body.name;
         });*/
    }
}
const documentacionSaveRoutes = new DocumentacionSaveRoutes();
exports.default = documentacionSaveRoutes.router;
