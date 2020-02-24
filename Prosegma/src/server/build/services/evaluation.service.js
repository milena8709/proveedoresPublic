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
        API_URI_PROVEEDORES = 'http://localhost:3010/api/evaluation';
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
        return this.http.get(`${this.API_URI_PROVEEDORES}/getEvaluation/${evaluation.idProvider}/${evaluation.name}/${evaluation.date}/${evaluation.semester}`);
    }
    
};
EvaluationService = __decorate([
    core_1.Injectable({
        providedIn: 'root'
    })
], EvaluationService);
exports.EvaluationService = EvaluationService;