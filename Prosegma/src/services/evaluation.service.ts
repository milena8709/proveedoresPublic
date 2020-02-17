import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EvaluationService {


  API_URI_PROVEEDORES = 'http://localhost:3010/api/evaluation';


  constructor(private http: HttpClient) {
   }


    getProveedor(): Observable<any> {
      console.log(this.API_URI_PROVEEDORES);
      return this.http.get(`${this.API_URI_PROVEEDORES}`);
   }

   
}
