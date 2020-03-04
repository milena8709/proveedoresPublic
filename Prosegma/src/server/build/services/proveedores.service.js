"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
let ProvidersService = class ProvidersService {
    constructor(http) {
        this.http = http;
        API_URI_PROVIDERS = 'https://prosegmaprueba.us-3.evennode.com/api/provider';
    }

    getProveedorById(reques) {
        console.log(this.API_URI_PROVIDERS);
        console.log('reques1 :: ' + JSON.stringify(reques));
        let id = reques.idProveedor;
        let name = reques.socialReason;
        if (reques.idProveedor === '' || reques.idProveedor === null) {
            id = ' ';
        }
        if (reques.socialReason === '' || reques.socialReason === null) {
            name = ' ';
        }
        return this.http.get(`${this.API_URI_PROVIDERS}/${id}/${name}/`);
    }

    
};
ProvidersService = __decorate([
    core_1.Injectable({
        providedIn: 'root'
    })
], ProvidersService);
exports.ProvidersService = ProvidersService;