import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CamposproveedorService } from '../../services/camposproveedor.service';
import { DialogService } from '../dialog/dialog.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-upgrade',
  templateUrl: './buscarTareas.component.html',
  styleUrls: ['./buscarTareas.component.scss']
})

export class BuscarTareasComponent implements OnInit {
  proveedores: any = [];
  proveedorSeleccionado: any[];
  // tslint:disable-next-line: max-line-length
  constructor(private modalService: NgbModal, private services: CamposproveedorService, private dialogService: DialogService, private router: Router) { }

  ngOnInit() {
    console.log('Buscar tareas');
  }

  searchProveedor(search: NgForm) {
    this.services.searchProveedor(search.value).subscribe(res => {
      console.log('proveedor respuesta');
      this.proveedores = res;
    }, err => {
      this.dialogService.openModalOk('Error', err.error.text, () => {
        // tslint:disable-next-line: no-unused-expression
      });
    });
  }


selectionProveedor(indice: any) {
  const item: any = indice;
    console.log('seleccion proveedor doc');
    if (indice.estado !== '3' && indice.estado.toUpperCase() !== 'finalizada'.toUpperCase()) {

      if (this.proveedorSeleccionado !== null && this.proveedorSeleccionado !== undefined) {
        if (this.proveedorSeleccionado.indexOf(indice) >= 0) {
          this.proveedorSeleccionado = this.proveedorSeleccionado.filter(function (i) { return i !== indice; });
        } else {
          this.proveedorSeleccionado.push(indice);
        }
        this.services.setProveedorSeleccionado(this.proveedorSeleccionado);
       // tslint:disable-next-line: prefer-const
        this.router.navigateByUrl('/gestionartarea');
      } else {
        this.proveedorSeleccionado = indice;
        this.services.setProveedorSeleccionado(this.proveedorSeleccionado);
        this.router.navigateByUrl('/gestionartarea');
      }
    } else {
      this.dialogService.openModalOk('Error', 'El proveedor ya ha sido finalizado', () => {
        // tslint:disable-next-line: no-unused-expression
      });
    }
  }
}
