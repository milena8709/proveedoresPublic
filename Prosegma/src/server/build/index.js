"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import express, { Application } from 'express';
const express = require('express');
const morgan = require('morgan');
const corse = require('cors');
const camposproveedorRoutes_1 = __importDefault(require("./routes/camposproveedorRoutes"));
const catalogoRoutes_1 = __importDefault(require("./routes/catalogoRoutes"));
class Server {
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3010);
        this.app.use(morgan('dev'));
        this.app.use(corse());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }
    routes() {
        console.log('llega aqui index.ts');
        // this.app.use(camposProveedorRoutes);
        this.app.use('/api/campos', camposproveedorRoutes_1.default);
        this.app.use('/api/catalogo', catalogoRoutes_1.default);
        // tslint:disable-next-line: no-console
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on Port', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
