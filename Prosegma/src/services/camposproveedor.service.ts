import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Proveedor } from '../app/models/proveedor';
import { CamposProveedor } from '../app/models/camposproveedor';




declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Principal',  icon: 'design_app', class: '' },
  { path: '/icons', title: 'Cuenta',  icon: 'education_atom', class: '' },
  { path: '/maps', title: 'Administración cuenta',  icon: 'location_map-big', class: '' },
  { path: '/notifications', title: 'Inscripcion Proveedor',  icon: 'ui-1_bell-53', class: '' },

  { path: '/user-profile', title: 'Selección Proveedor',  icon: 'users_single-02', class: '' },
  { path: '/table-list', title: 'Evaluación Proveedor',  icon: 'design_bullet-list-67', class: '' },
  { path: '/typography', title: 'Entrada Materiales',  icon: 'text_caps-small', class: '' },
  { path: '/upgrade', title: 'Revisión Proveedores',  icon: 'objects_spaceship', class: '' }
 // { path: '/newuser', title: 'Nuevo Usuario',  icon: 'objects_spaceship', class: 'active active-pro' }
 // { path: '/resultSeleccion', title: 'Resultado Selección',  icon: 'objects_spaceship', class: 'active active-pro' }

];

export const ROUTES_LOGOUT: RouteInfo[] = [
  { path: '/dashboard', title: 'Principal',  icon: 'design_app', class: '' }
];
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
  showMenu: boolean;


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

saveUsuario(usuario: any): Observable<object>  {
  return this.http.post(`${this.API_URI_USUARIO}`, usuario);
}

// ******************************************* /

setProveedores(proveedoresConAHP: any) {
  this.proveedores = proveedoresConAHP;
}

getProveedores() {
  return this.proveedores;
}

setMenuShow(menuShow: boolean) {
  this.showMenu = menuShow;
  if (!this.showMenu) {
    return ROUTES_LOGOUT.filter(menuItem => menuItem);
  } else {
    return ROUTES.filter(menuItem => menuItem);
  }
}

getMenuShow() {
  /*if (this.showMenu === undefined) {
    return ROUTES_LOGOUT.filter(menuItem => menuItem);
  } else {*/
    return ROUTES.filter(menuItem => menuItem);
 // }
}

}
