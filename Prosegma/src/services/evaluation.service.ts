import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EvaluationService {


   private API_URI_PROVEEDORES = 'http://localhost:3010/api/evaluation';


  constructor(private http: HttpClient) {
   }


    getProveedor(): Observable<any> {
      console.log(this.API_URI_PROVEEDORES);
      return this.http.get(`${this.API_URI_PROVEEDORES}`);
   }

   /*getProveedorById(reques: any):  Observable<any> {
    // console.log('REQUEST :: ' + JSON.parse(reques));
    return this.http.get(`${this.API_URI_PROVEEDORES}/id`, reques);
   }*/

   createEvaluation(proveedor: any): Observable<any>  {
    return this.http.post(`${this.API_URI_PROVEEDORES}`, proveedor);
   }

   getEvaluation(evaluation: any): Observable<any> {
    console.log(evaluation);
    return this.http.get(`${this.API_URI_PROVEEDORES}/getEvaluation/${evaluation.idProvider}/${evaluation.name}/${evaluation.date}/${evaluation.semester}`);
   }

}
