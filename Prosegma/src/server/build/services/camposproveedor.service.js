"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
let CamposproveedorService = class CamposproveedorService {
    constructor(http) {
        this.http = http;
        this.API_URI_CAMPOS = 'http://localhost:3010/api/campos';
        this.API_URI_CATALOGO = 'http://localhost:3010/api/catalogo';
        this.API_URI_CLASIFICACION = 'http://localhost:3010/api/clasificacion';
        this.API_URI_CLASIFICACION_SAVE = 'http://localhost:3010/api/clasificacion/save';
        this.API_URI_CLASIFICACION_DOC = 'http://localhost:3010/api/documentacion';
    }
    getCampoProveedor() {
        console.log(this.API_URI_CAMPOS);
        return this.http.get(`${this.API_URI_CAMPOS}`);
    }
    getCamposProveedor(id) {
        return this.http.get(`${this.API_URI_CAMPOS}/${id}`);
    }
    getCatalogoById(id) {
        return this.http.get(`${this.API_URI_CATALOGO}/${id}`);
    }
    saveProveedor(proveedor) {
        return this.http.post(`${this.API_URI_CAMPOS}`, proveedor);
    }
    UpdateProveedor(id, proveedor) {
        this.http.put(`${this.API_URI_CAMPOS}/${id}`, proveedor);
    }
    /*****************CLASIFICACION*******************/
    getClasificacion(parametros) {
        return this.http.post(`${this.API_URI_CLASIFICACION}`, parametros);
    }
    saveClasificacion(clasificacionDatos) {
        return this.http.post(`${this.API_URI_CLASIFICACION_SAVE}`, clasificacionDatos);
    }
    /*******************DOCUMENTACION*********************/
    getDocumentacion(id) {
        return this.http.get(`${this.API_URI_CLASIFICACION_DOC}/${id}`);
    }
    postFileImagen(file) {
        return this.http.post(`${this.API_URI_CLASIFICACION_DOC}`, file);
    }
};
CamposproveedorService = __decorate([
    core_1.Injectable({
        providedIn: 'root'
    })
], CamposproveedorService);
exports.CamposproveedorService = CamposproveedorService;
