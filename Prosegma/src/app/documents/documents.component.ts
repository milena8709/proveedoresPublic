import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Field } from '../models/field';
import { CamposproveedorService } from '../../services/camposproveedor.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})

export class DocumentsComponent implements OnInit {

  constructor(private toastr: ToastrService, private service: CamposproveedorService) {}
  indice: number;
  campoField: any[] = [];
  itemtexto: any = {};
  campoTexto: Field[] = [];



  ngOnInit(): void {

    this.service.getDocumentacion(10).subscribe(
      res => {
      this.campoField = (res);
      this.crearCampos();
      },
      err => console.error(err)
      );

  }

  crearCampos() {
    this.indice = 0;
    for (const campo of this.campoField) {
         this.itemtexto.id = campo.idcamposproveedor;
         this.itemtexto.label = campo.label;
         this.itemtexto.nombre =  campo.label;
         this.campoTexto.push(this.itemtexto);
         this[campo.label] = '';
      this.indice++;
    }
  }

  public cargandoArchivo(files: FileList) {

    // tslint:disable-next-line: indent
		this.service.postFileImagen(files[0]).subscribe(
    res => {
      console.log(<any>res);
    },
    error => {
      console.log(<any>error);
    }
  );
}

  showNotification(from, align) {

      const color = Math.floor((Math.random() * 5) + 1);

        this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span> Usted realizará una selección de proveedor para la licitación/clasificación. <b>123456</b>', '', {
           timeOut: 8000,
           closeButton: true,
           enableHtml: true,
           toastClass: 'alert alert-success alert-with-icon',
           positionClass: 'toast-' + from + '-' +  align
         });
        }
}
