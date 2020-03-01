import { Router, Request } from 'express';
import { documentacionController } from '../controllers/documentacionController';
import {HttpClientModule } from '@angular/common/http';

const express = require('express');
const bodyParser = require('body-parser');
const multipart = require('connect-multiparty');

const app = express();

app.use(bodyParser.json());


class DocumentacionRoutes {

    public router: Router = Router();
    file: any;
    multipartMidlewaren = multipart({
        uploadDir: './files'
    });

     constructor() {
        console.log('ingreso al router documentacion');
        this.config();
    }

    config(): void {
        this.router.get('/', documentacionController.list);
        this.router.get('/:id', documentacionController.getsolicitudCamposById);
        this.router.put('/:id', documentacionController.update);
        this.router.delete('/:id', documentacionController.delete);
        this.router.post('/', documentacionController.create);

       this.router.post('/', this.multipartMidlewaren, (req, res) => {
        const file = req.body.file;
        const name = req.body.name;
        });
    }

}

const documentacionRoutes = new DocumentacionRoutes();
export default documentacionRoutes.router;

