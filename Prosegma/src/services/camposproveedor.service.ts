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
  API_URI_CLASIFICACION_DOC = 'http://localhost:3010/api/documentacion';


  constructor(private http: HttpClient) {
   }


    getCampoProveedor(): Observable<any> {
      console.log(this.API_URI_CAMPOS);
      return this.http.get(`${this.API_URI_CAMPOS}`);
   }

   getCamposProveedor(id: number):  Observable<CamposProveedor> {
    return this.http.get(`${this.API_URI_CAMPOS}/${id}`);
   }



   getCatalogoById(id: number):  Observable<CamposProveedor> {
    return this.http.get(`${this.API_URI_CATALOGO}/${id}`);
   }



   saveProveedor(proveedor: Proveedor): Observable<any>  {
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

 postFileImagen(file: any): Observable<object>  {
  return this.http.post(`${this.API_URI_CLASIFICACION_DOC}`, file);
}

}
