import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';

import { Proveedor } from '../app/models/proveedor';
import { CamposProveedor } from '../app/models/camposproveedor';

@Injectable({
  providedIn: 'root'
})
export class CamposproveedorService {

  API_URI = 'http://localhost:3010/api';

  constructor(private http: HttpClient) {
   }


    getCampoProveedor(): Observable<any> {
      console.log(this.API_URI);
      return this.http.get(`${this.API_URI}`);
   }

   getCamposProveedor(id: number):  Observable<CamposProveedor> {
    return this.http.get(`${this.API_URI}+'/campos'${id}`);
   }

   getCatalogoById(id: number):  Observable<CamposProveedor> {
    return this.http.get(`${this.API_URI + '/catalogo'}/${id}`);
   }

   saveProveedor(proveedor: Proveedor) {
    this.http.post(`${this.API_URI}`, proveedor);
   }


 UpdateProveedor(id: string , proveedor: Proveedor) {
  this.http.put(`${this.API_URI}/${id}`, proveedor);
 }

}
