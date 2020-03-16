import { Component, OnInit, HostBinding } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CamposproveedorService } from '../../services/camposproveedor.service';
import { DialogService } from '../dialog/dialog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestionar-tarea',
  templateUrl: './gestionar-tarea.component.html',
  styleUrls: ['./gestionar-tarea.component.scss']
})
export class GestionarTareaComponent implements OnInit {
  @HostBinding('class') classes = 'div';

  proveedor: any;
  id: string;
  name: string;
  status: string;
  documentos: any = [];
  documentosaceptados: any = [];
  estado: string;

  // tslint:disable-next-line: max-line-length
  constructor(private modalService: NgbModal, private services: CamposproveedorService, private dialogService: DialogService, private router: Router) { }


  ngOnInit() {
    this.proveedor = this.services.getProveedorSeleccionado();
    this.id = this.proveedor.nit;
    this.name = this.proveedor.nombre;
    this.status = this.proveedor.estado;
    this.services.getDocumentosInscripcion(this.proveedor.nit).subscribe(
      res => {
        console.log('proveedor respuesta');
        this.documentos = res;
      },
      err => {
        this.dialogService.openModalOk('Error', err.error.text, () => {
          // tslint:disable-next-line: no-unused-expression

        });
      });
  }



  change(indice: any) {
    if ( this.documentosaceptados.indexOf(indice) >= 0) {
      this.documentosaceptados = this.documentosaceptados.filter(function(i) { return i !== indice; });
    } else {
      this.documentosaceptados.push(indice);
    }
  }


  updateRejectedDocuments() {
    // tslint:disable-next-line: prefer-const
    let revision: any = {};
    revision.documentos = this.documentosaceptados;
    revision.estado = this.estado;
    revision.id_proveedor = this.proveedor.nit;
    revision.id = this.proveedor.id;
    this.services.updateTaskState(revision).subscribe(res => {
      this.dialogService.openModalOk('Información', 'Documentos actualizados satisfactoriamente', () => {
        this.router.navigateByUrl('/upgrade');
      });
    }, err => {
      this.dialogService.openModalOk('Error', err.error.text, () => {
      });
    });
  }

}
