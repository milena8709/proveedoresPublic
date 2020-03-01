import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Field } from '../models/field';
import { CamposproveedorService } from '../../services/camposproveedor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DialogService } from '../dialog/dialog.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})

export class DocumentsComponent implements OnInit {
  values: any;
  value: any;
  uploadedFiles: Array<File>;
  documento: {};
  documentos: any[];
   contador = 0;
  usuario: any;

// tslint:disable-next-line: member-ordering

  // tslint:disable-next-line: max-line-length
  constructor(private dialogService: DialogService, private router: Router, private http: HttpClient, private toastr: ToastrService, private service: CamposproveedorService, private route: ActivatedRoute) {}
  indice: number;
  campoField: any[] = [];
  itemtexto: any = {};
  campoTexto: Field[] = [];




  ngOnInit(): void {
    this.usuario = this.service.getUsuario();
    this.values = this.route
    .queryParams
    .subscribe(params => {
      // Defaults to 0 if no query param provided.
      this.value = +params['id'] || 0;
    });

    console.log('value' + this.value + 'values' + this.values);
    this.service.getDocumentacion(this.value).subscribe(
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
      this.itemtexto = {};
      if (campo !== null) {
        this.itemtexto.id = campo.iddocumentos;
        this.itemtexto.label = campo.nombredocumento;
        this.itemtexto.nombre =  campo.nombredocumento;
        this.itemtexto.obligatorio =  campo.obligatorio;
        this.campoTexto.push(this.itemtexto);
        this.indice++;
        this[campo.label] = '';
      }

    }
  }

  public uploadFile(e) {
    if (this.uploadedFiles === undefined) {
      this.uploadedFiles = new Array<File>();
    }
    this.uploadedFiles.push(e.target.files[0]);

    if (this.uploadedFiles.length > 0) {



    this.documento = {
      ruta_documento : '/file',
      id_inscripcion: this.value,
      id_documento: e.target.name,
      id_proveedor:this.usuario.id_proveedor
    };
    if (this.documentos === undefined) {
      this.documentos = new Array<any>();
    }
      this.documentos.push(this.documento);
      if (this.documentos.length > 0) {
        this.documentos = this.documentos.filter((valorActual: any, indiceActual: any, arreglo: any[]) => {
          // tslint:disable-next-line: max-line-length
        return arreglo.findIndex(valorDelArreglo => JSON.stringify(valorDelArreglo) === JSON.stringify(valorActual)) === indiceActual;
      });
      }


    // this.uploadedFiles.push(e.target.files[0]);
  }
}

  public saveFile() {

      for (let index = 0; index < this.uploadedFiles.length; index++) {
        console.log('archivo -- ' + this.uploadedFiles[index].name);
      const formData = new FormData();
        formData.append('uploads[]', this.uploadedFiles[index], this.uploadedFiles[index].name);
        this.http.post('http://localhost:3010/api/documentacion', formData, ).subscribe((d) => {});


        this.service.postFileImagen(this.documentos).subscribe(
          res => {
            this.contador++;
            // tslint:disable-next-line: max-line-length
            if (this.contador <= 1) {
              // tslint:disable-next-line: max-line-length
              this.dialogService.openModalOk('Información', 'Su inscripcion se encuentra en estado: Esperando respuesta de aceptación ', () => {
                // tslint:disable-next-line: no-unused-expression
                this.router.navigateByUrl('/dashboard');
              });
            }


          },
          err => {
             this.showNotification('Error', 'Ocurrio un error al guardar, por favor intente mas tarde');
          }
          );
      }
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
