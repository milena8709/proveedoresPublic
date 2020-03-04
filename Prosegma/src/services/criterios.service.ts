import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CriteriosService {

   private API_URI_CRITERIOS = 'https://prosegmaprueba.us-3.evennode.com/api/criterios';


  constructor(private http: HttpClient) {
   }

   getEvaluation(): Observable<any> {
    console.log(this.API_URI_CRITERIOS);
    return this.http.get(`${this.API_URI_CRITERIOS}`);
   }

}
