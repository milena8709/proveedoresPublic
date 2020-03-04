import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TransactionService {


   private API_URI_MATERIALS = 'https://prosegmaprueba.us-3.evennode.com/api/materials';


  constructor(private http: HttpClient) {
   }


   getMaterials(): Observable<any> {
      console.log(this.API_URI_MATERIALS);
      return this.http.get(`${this.API_URI_MATERIALS}`);
   }

   getEvaluationByDetail(materials: any): Observable<any> {
    console.log(materials);
    let segmento  = materials.segmento;
    let familia  = materials.familia;
    let clase  = materials.clase;
    let producto  = materials.producto;
    if (materials.segmento === '' || materials.segmento === null || materials.segmento == undefined) {
        segmento = ' ';
    }
    if (materials.familia === '' || materials.familia === null || materials.familia == undefined) {
        familia = ' ';
    }
    if (materials.clase === '' || materials.clase === null || materials.clase == undefined) {
        clase = ' ';
    }
    if (materials.producto === '' || materials.producto === null || materials.producto == undefined) {
        producto = ' ';
      }
    return this.http.get(`${this.API_URI_MATERIALS}/getMaterial/${segmento}/${familia}/${clase}/${producto}/`);
   }

   createTransaction(transaction: any): Observable<any>  {
    return this.http.post(`${this.API_URI_MATERIALS}`, transaction);
   }

   findTransactionByFilter(filters: any): Observable<any>{
    console.log(filters);
    let estado  = filters.estado;
    let fecha_limite_entrega  = filters.fecha_limite_entrega;
    let idproveedor  = filters.idproveedor;
    let id_orden_compra  = filters.id_orden_compra;
    if (filters.estado === '' || filters.estado === null || filters.estado == undefined) {
        estado = ' ';
    }
    if (filters.fecha_limite_entrega === '' || filters.fecha_limite_entrega === null || filters.fecha_limite_entrega == undefined) {
        fecha_limite_entrega = ' ';
    }
    if (filters.idproveedor === '' || filters.idproveedor === null || filters.idproveedor == undefined) {
        idproveedor = ' ';
    }
    if (filters.id_orden_compra === '' || filters.id_orden_compra === null || filters.id_orden_compra == undefined) {
        id_orden_compra = ' ';
    }
    return this.http.get(`${this.API_URI_MATERIALS}/getTransaction/${estado}/${fecha_limite_entrega}/${idproveedor}/${id_orden_compra}/`);
   }

   getTransactions(): Observable<any> {
    console.log(this.API_URI_MATERIALS);
    return this.http.get(`${this.API_URI_MATERIALS}/getTransaction`);
   }

   getTransactionToUpdate(filter: any): Observable<any> {
     console.log(filter);
     let id = filter;
    console.log(this.API_URI_MATERIALS);
    return this.http.get(`${this.API_URI_MATERIALS}/getTransactionUpdate/${id}`);
   }

   updateTransaction(transaction: any) {
    console.log(transaction);
    console.log(this.API_URI_MATERIALS);
    return this.http.put(`${this.API_URI_MATERIALS}/updateTransaction`, transaction);
   }

}
