import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EvaluationService {


   private API_URI_PROVEEDORES = 'http://localhost:3010/api/evaluation';
   private API_URI_CRITERIOS = 'http://localhost:3010/api/criterios';


  constructor(private http: HttpClient) {
   }


    getProveedor(): Observable<any> {
      console.log(this.API_URI_PROVEEDORES);
      return this.http.get(`${this.API_URI_PROVEEDORES}`);
   }

   getProveedorById(id: number, name: string):  Observable<any> {
    return this.http.get(`${this.API_URI_PROVEEDORES}/${id}/${name}`);
   }

   createEvaluation(proveedor: any): Observable<any>  {
    return this.http.post(`${this.API_URI_PROVEEDORES}`, proveedor);
   }

   getEvaluation(): Observable<any> {
    console.log(this.API_URI_CRITERIOS);
    return this.http.get(`${this.API_URI_CRITERIOS}`);
   }

}
