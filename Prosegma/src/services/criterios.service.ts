import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CriteriosService {

   private API_URI_CRITERIOS = 'http://localhost:3010/api/criterios';


  constructor(private http: HttpClient) {
   }

   getEvaluation(): Observable<any> {
    console.log(this.API_URI_CRITERIOS);
    return this.http.get(`${this.API_URI_CRITERIOS}`);
   }

}
