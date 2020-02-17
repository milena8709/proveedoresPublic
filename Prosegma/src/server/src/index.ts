// import express, { Application } from 'express';
const express = require('express');
const morgan = require('morgan');


const corse = require('cors');

import { Application } from 'express';
import camposProveedorRoutes from './routes/camposproveedorRoutes';
import catalogoRoutes from './routes/catalogoRoutes';
import clasificacionRoutes from './routes/clasificacionRoutes';
import documentacionRoutes from './routes/documentacionRoutes';
import evaluationRoutes from './routes/evaluationRoutes';

class Server {

public app: Application;

constructor() {
 this.app = express();
 this.config();
 this.routes();
}
config(): void {
    this.app.set('port', process.env.PORT || 3010);
    this.app.use(morgan('dev'));
    this.app.use(corse());
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended: false}));
}

routes(): void {
    console.log('llega aqui indexddddd.ts');
    // this.app.use(camposProveedorRoutes);
    this.app.use('/api/campos', camposProveedorRoutes);
    this.app.use('/api/catalogo', catalogoRoutes);
    this.app.use('/api/clasificacion', clasificacionRoutes);
    this.app.use('/api/documentacion', documentacionRoutes);

    //routes evaluacion
    this.app.use('/api/evaluation', evaluationRoutes);
// tslint:disable-next-line: no-console

}

start(): void {
this.app.listen(this.app.get('port'), () => {

    console.log('Server on Port', this.app.get('port'));
});
}

}

const server = new Server() ;
server.start();
