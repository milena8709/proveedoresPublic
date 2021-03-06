const morgan = require('morgan');
const corse = require('cors');
const express = require('express');


import camposProveedorRoutes from './routes/camposproveedorRoutes';
import catalogoRoutes from './routes/catalogoRoutes';
import clasificacionRoutes from './routes/clasificacionRoutes';
import documentacionRoutes from './routes/documentacionRoutes';
import documentacionSaveRoutes from './routes/documentacionSaveRoutes';

import { Application } from 'express';
import seleccionRoutes from './routes/seleccionRoutes';
import saveSeleccionRoutes from './routes/saveSeleccionRoutes';

import evaluationRoutes from './routes/evaluationRoutes';
import criteriosRoutes from './routes/criteriosRoutes';
import providersRoutes from './routes/providersRoutes';
import registroUsuario from './routes/registroUsuario';
import transactionsRoutes from './routes/transactionsRoutes';
import busquedaProveedorRoutes from './routes/busquedaProveedorRoutes';
import documentTaskRoutes from './routes/documentTaskRoutes';
import proveedorRoutes from './routes/proveedorRoutes';
import perfilRoutes from './routes/perfilRoutes';
import usuarioRoutes from './routes/usuarioRoutes';


class Server {
     bodyParser = require('body-parser');
public app: Application;


constructor() {
 this.app = express();
 this.config();
 this.routes();
}

formidable = require('express-formidable');

config(): void {
    this.app.set('port', process.env.PORT || 3010);
    this.app.use(morgan('dev'));
    this.app.use(corse());
    this.app.use(express.json());
    this.app.use(this.bodyParser.urlencoded({ extended: false }));
    this.app.use(express.urlencoded({extended: false}));
}

routes(): void {
    console.log('llega aqui indexddddd.ts');
    this.app.use('/api/campos', camposProveedorRoutes);
    this.app.use('/api/catalogo', catalogoRoutes);
    this.app.use('/api/clasificacion', clasificacionRoutes);
    this.app.use('/api/documentacion', documentacionRoutes);
    this.app.use('/api/documentacion/save', documentacionSaveRoutes);
    this.app.use('/api/seleccion', seleccionRoutes);
    this.app.use('/api/seleccion/save', saveSeleccionRoutes);
    this.app.use('/api/evaluation', evaluationRoutes);
    this.app.use('/api/criterios', criteriosRoutes);
    this.app.use('/api/provider', providersRoutes);
    this.app.use('/api/materials', transactionsRoutes);
    this.app.use('/api/usuario', registroUsuario);
    this.app.use('/api/revision', busquedaProveedorRoutes);
    this.app.use('/api/revision/save', documentTaskRoutes);
    this.app.use('/api/proveedor', proveedorRoutes);
    this.app.use('/api/cuenta', usuarioRoutes);
    this.app.use('/api/perfil', perfilRoutes);



}

start(): void {
this.app.listen(this.app.get('port'), () => {
    console.log('Server on Port', this.app.get('port'));
});
}
}

const server = new Server() ;
server.start();
