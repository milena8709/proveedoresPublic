import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProvidersService {

   private API_URI_PROVIDERS = 'https://prosegmaprueba.us-3.evennode.com/api/provider';


  constructor(private http: HttpClient) {
   }

   getProveedorById(reques: any): Observable<any> {
    console.log('reques1 :: ' + JSON.stringify(reques));
    let id = reques.idProveedor;
    let name = reques.socialReason;
    if (reques.idProveedor === '' || reques.idProveedor === null) {
        id = ' ';
    }
    if (reques.socialReason === '' || reques.socialReason === null) {
        name = ' ';
    }
    return this.http.get(`${this.API_URI_PROVIDERS}/${id}/${name}/`);
   }

}
