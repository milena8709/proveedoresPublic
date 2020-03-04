import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EvaluationService {


   private API_URI_PROVEEDORES = 'https://prosegmaprueba.us-3.evennode.com/api/evaluation';


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
    let id  = evaluation.idProvider;
    let razon_social  = evaluation.name;
    let year  = evaluation.date;
    let semester = evaluation.semester;
    if (evaluation.idProvider === '' || evaluation.idProvider === null) {
        id = ' ';
    }
    if (evaluation.name === '' || evaluation.name === null) {
      razon_social = ' ';
    }
    if (evaluation.date === '' || evaluation.date === null) {
      year = ' ';
    }
    if (evaluation.semester === '' || evaluation.semester === null) {
      semester = ' ';
    }
    return this.http.get(`${this.API_URI_PROVEEDORES}/getEvaluacion/${id}/${razon_social}/${year}/${semester}/`);
   }

   getEvaluationByDetail(evaluation: any): Observable<any> {
    console.log(evaluation);
    let id  = evaluation.id;
    let titulo  = evaluation.titulo;
    let year  = evaluation.year;
    if (evaluation.idProvider === '' || evaluation.idProvider === null) {
        id = ' ';
    }
    if (evaluation.titulo === '' || evaluation.titulo === null) {
      titulo = ' ';
    }
    if (evaluation.year === '' || evaluation.year === null) {
      year = ' ';
    }
    return this.http.get(`${this.API_URI_PROVEEDORES}/getEvaluacionByDetail/${id}/${titulo}/${year}/`);
   }

}
