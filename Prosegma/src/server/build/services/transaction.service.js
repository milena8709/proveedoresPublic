"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
let TransactionService = class TransactionService {
    constructor(http) {
        this.http = http;
        API_URI_MATERIALS = 'https://prosegmaprueba.us-3.evennode.com/api/materials';
    }

    getMaterials(){
        console.log(this.API_URI_MATERIALS);
        return this.http.get(`${this.API_URI_MATERIALS}`);
     }

    getEvaluationByDetail(materials){
        console.log(materials);
        let segmento  = materials.segmento;
        let familia  = materials.familia;
        let clase  = materials.clase;
        let producto  = materials.producto;
        if (materials.segmento === '' || materials.segmento === null || materials.segmento == undefined) {
            segmento = ' ';
        }
        if (materials.familia === '' || materials.familia === null || materials.familia == undefined) {
            familia = ' ';
        }
        if (materials.clase === '' || materials.clase === null || materials.clase == undefined) {
            clase = ' ';
        }
        if (materials.producto === '' || materials.producto === null || materials.producto == undefined) {
            producto = ' ';
          }
        return this.http.get(`${this.API_URI_MATERIALS}/getMaterial/${segmento}/${familia}/${clase}/${producto}/`);
       }

    createTransaction(transaction) {
        return this.http.post(`${this.API_URI_MATERIALS}`, transaction);
       }

    findTransactionByFilter(filters){
        console.log(filters);
        let estado  = filters.estado;
        let fecha_limite_entrega  = filters.fecha_limite_entrega;
        let idproveedor  = filters.idproveedor;
        let id_orden_compra  = filters.id_orden_compra;
        if (filters.estado === '' || filters.estado === null || filters.estado == undefined) {
            estado = ' ';
        }
        if (filters.fecha_limite_entrega === '' || filters.fecha_limite_entrega === null || filters.fecha_limite_entrega == undefined) {
            fecha_limite_entrega = ' ';
        }
        if (filters.idproveedor === '' || filters.idproveedor === null || filters.idproveedor == undefined) {
            idproveedor = ' ';
        }
        if (filters.id_orden_compra === '' || filters.id_orden_compra === null || filters.id_orden_compra == undefined) {
            id_orden_compra = ' ';
        }
        return this.http.get(`${this.API_URI_MATERIALS}/getTransaction/${estado}/${fecha_limite_entrega}/${idproveedor}/${id_orden_compra}/`);
    }

    getTransactions() {
        console.log(this.API_URI_MATERIALS);
        return this.http.get(`${this.API_URI_MATERIALS}/getTransaction`);
    }

    getTransactionToUpdate(filter) {
        console.log(filter);
        let id = filter;
        console.log(this.API_URI_MATERIALS);
        return this.http.get(`${this.API_URI_MATERIALS}/getTransactionUpdate/${id}`);
    }

    updateTransaction(transaction){
        console.log(transaction);
        console.log(this.API_URI_MATERIALS);
        return this.http.put(`${this.API_URI_MATERIALS}/updateTransaction`, transaction);
    }

    
};
TransactionService = __decorate([
    core_1.Injectable({
        providedIn: 'root'
    })
], TransactionService);
exports.TransactionService = TransactionService;