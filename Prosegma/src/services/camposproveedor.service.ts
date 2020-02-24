import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Proveedor } from '../app/models/proveedor';
import { CamposProveedor } from '../app/models/camposproveedor';


@Injectable({
  providedIn: 'root'
})

export class CamposproveedorService {
 



  API_URI_CAMPOS = 'http://localhost:3010/api/campos';
  API_URI_CATALOGO = 'http://localhost:3010/api/catalogo';
  API_URI_CLASIFICACION = 'http://localhost:3010/api/clasificacion';
  API_URI_CLASIFICACION_SAVE = 'http://localhost:3010/api/clasificacion/save';
  API_URI_CLASIFICACION_DOC = 'http://localhost:3010/api/documentacion/save';
  API_URI_SELECCION_PROVEEDOR = 'http://localhost:3010/api/seleccion';
  API_URI_USUARIO = 'http://localhost:3010/api/usuario';

  proveedores: any = [];


  constructor(private http: HttpClient) {
   }



   getCamposProveedor():  Observable<CamposProveedor> {
    console.log(this.API_URI_CAMPOS);
    return this.http.get(`${this.API_URI_CAMPOS}/`);
   }



   getCatalogoById(id: number):  Observable<CamposProveedor> {
    return this.http.get(`${this.API_URI_CATALOGO}/${id}`);
   }



   saveProveedor(proveedor: Proveedor): Observable<any>  {
    console.log('proveedor: ', [proveedor]);
    return this.http.post(`${this.API_URI_CAMPOS}`, proveedor);
   }


   UpdateProveedor(id: string , proveedor: Proveedor) {
    this.http.put(`${this.API_URI_CAMPOS}/${id}`, proveedor);
   }



/*****************CLASIFICACION*******************/
 getClasificacion(parametros: any):  Observable<object> {
  return this.http.post(`${this.API_URI_CLASIFICACION}`, parametros);
 }

 saveClasificacion(clasificacionDatos: any) {
  return this.http.post(`${this.API_URI_CLASIFICACION_SAVE}`, clasificacionDatos);
}
/*******************DOCUMENTACION*********************/
getDocumentacion(id: number):  Observable<any> {
  return this.http.get(`${this.API_URI_CLASIFICACION_DOC}/${id}`);
 }

 postFileImagen(file:any): Observable<object>  {
  return this.http.post(`${this.API_URI_CLASIFICACION_DOC}`, file);
}

getSeleccionProveedor(filtros: any): Observable<object>  {
  return this.http.post(`${this.API_URI_SELECCION_PROVEEDOR}`, filtros);
}

saveProveedoresSeleccionados(proveedoresSeleccionados: any): Observable<object>  {
  return this.http.post(`${this.API_URI_SELECCION_PROVEEDOR}/save`, proveedoresSeleccionados);
}



getCriterios() {
  return this.http.get(`${this.API_URI_SELECCION_PROVEEDOR}`);
}


saveResultProveedores(proveedores: any[], id: any): Observable<object>  {
return this.http.put(`${this.API_URI_SELECCION_PROVEEDOR}/save/${id}`, proveedores);
}


logIn(login: any) {
  return this.http.get(`${this.API_URI_USUARIO}/${login.usuario}/${login.password}`);
}

// ******************************************* /

setProveedores(proveedoresConAHP: any) {
  this.proveedores = proveedoresConAHP;
}

getProveedores() {
  return this.proveedores;
}
}
