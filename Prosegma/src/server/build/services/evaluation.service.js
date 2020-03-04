"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
let EvaluationService = class EvaluationService {
    constructor(http) {
        this.http = http;
        API_URI_PROVEEDORES = 'https://prosegmaprueba.us-3.evennode.com/api/evaluation';
    }
    getCampoProveedor() {
        console.log(this.API_URI_PROVEEDORES);
        return this.http.get(`${this.API_URI_PROVEEDORES}`);
    }

    createEvaluation(proveedor) {
        return this.http.post(`${this.API_URI_PROVEEDORES}`, proveedor);
    }

    getEvaluation(evaluation){
        console.log(evaluation);
        let id  = evaluation.idProvider;
        let razon_social  = evaluation.name;
        let year  = evaluation.date;
        let semester = evaluation.semester;
        if (evaluation.idProvider === '' || evaluation.idProvider === null) {
            id = ' ';
        }
        if (evaluation.name === '' || evaluation.name === null) {
          razon_social = ' ';
        }
        if (evaluation.date === '' || evaluation.date === null) {
          year = ' ';
        }
        if (evaluation.semester === '' || evaluation.semester === null) {
          semester = ' ';
        }
        return this.http.get(`${this.API_URI_PROVEEDORES}/getEvaluacion/${id}/${razon_social}/${year}/${semester}/`);
    }

    getEvaluationByDetail(evaluation){
        console.log(evaluation);
        let id  = evaluation.id;
        let titulo  = evaluation.titulo;
        let year  = evaluation.year;
        if (evaluation.idProvider === '' || evaluation.idProvider === null) {
            id = ' ';
        }
        if (evaluation.titulo === '' || evaluation.titulo === null) {
          titulo = ' ';
        }
        if (evaluation.year === '' || evaluation.year === null) {
          year = ' ';
        }
        return this.http.get(`${this.API_URI_PROVEEDORES}/getEvaluacionByDetail/${id}/${titulo}/${year}/`);
       }

    
};
EvaluationService = __decorate([
    core_1.Injectable({
        providedIn: 'root'
    })
], EvaluationService);
exports.EvaluationService = EvaluationService;