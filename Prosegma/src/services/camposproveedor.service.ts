import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Proveedor } from '../app/models/proveedor';
import { CamposProveedor } from '../app/models/camposproveedor';
import { SidebarComponent } from '../app/components/sidebar/sidebar.component';




declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}



@Injectable({
  providedIn: 'root'
})

export class CamposproveedorService {
  

  API_URI_CAMPOS = 'https://prosegmaprueba.us-3.evennode.com/api/campos';
  API_URI_CATALOGO = 'https://prosegmaprueba.us-3.evennode.com/api/catalogo';
  API_URI_CLASIFICACION = 'https://prosegmaprueba.us-3.evennode.com/api/clasificacion';
  API_URI_CLASIFICACION_SAVE = 'https://prosegmaprueba.us-3.evennode.com/api/clasificacion/save';
  API_URI_CLASIFICACION_DOC = 'https://prosegmaprueba.us-3.evennode.com/api/documentacion/save';
  API_URI_SELECCION_PROVEEDOR = 'https://prosegmaprueba.us-3.evennode.com/api/seleccion';
  API_URI_USUARIO = 'https://prosegmaprueba.us-3.evennode.com/api/usuario';
  API_URI_REVISION = 'https://prosegmaprueba.us-3.evennode.com/api/revision';

  API_URI_REVISION_SAVE = 'https://prosegmaprueba.us-3.evennode.com/api/revision/save';
  API_URI_PROVEEDOR = 'https://prosegmaprueba.us-3.evennode.com/api/proveedor';
  API_URI_CUENTA = 'https://prosegmaprueba.us-3.evennode.com/api/cuenta';
  API_URI_PERFIL = 'https://prosegmaprueba.us-3.evennode.com/api/perfil';



  proveedores: any = [];
  showMenu: boolean;
  menu: any = [];
  usuario: any;
  proveedor: any;


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
getDocumentacion(id: number, estado: string):  Observable<any> {
  return this.http.get(`${this.API_URI_CLASIFICACION_DOC}/${id}/${estado}`);
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

saveUsuario(usuario: any): Observable<object>  {
  return this.http.post(`${this.API_URI_USUARIO}`, usuario);
}


updatePassword(updatePassword: any, idusuario: any){
  return this.http.put(`${this.API_URI_USUARIO}/${idusuario}`, updatePassword);
}


getProveedorById(id: any) {
  return this.http.get(`${this.API_URI_USUARIO}/${id}`);
}

searchProveedor(values: any) {
  return this.http.post(`${this.API_URI_REVISION}`, values);
}

getDocumentosInscripcion(id: any) {
  return this.http.get(`${this.API_URI_REVISION}/${id}`);
}


saveExistingTask(tarea: any) {
  console.log('tarea a crear', tarea);
  return this.http.post(`${this.API_URI_REVISION_SAVE}`, tarea);
}


updateTaskState(revision: any) {
  return this.http.put(`${this.API_URI_REVISION_SAVE}`, revision);
}


getEstadoProveedor(id: any) {
  return this.http.get(`${this.API_URI_PROVEEDOR}/${id}`);
}

CreateNewAccounten(cuenta: any) {
  return this.http.post(`${this.API_URI_CUENTA}`, cuenta);
}

getCuenta() {
  return this.http.get(`${this.API_URI_CUENTA}`);
}

getPerfiles() {
  return this.http.get(`${this.API_URI_PERFIL}`);
}

// ******************************************* /

setProveedores(proveedoresConAHP: any) {
  this.proveedores = proveedoresConAHP;
}

setProveedorSeleccionado(proveedor: any) {
  this.proveedor = proveedor;
}

setUsuario(usuario: any) {
  this.usuario = usuario;
}

getUsuario() {
  return this.usuario;
}

getProveedores() {
  return this.proveedores;
}

getProveedorSeleccionado() {
  return this.proveedor;
}



}
