import { Component, OnInit, HostBinding, OnChanges, SimpleChanges, NgModule } from '@angular/core';
import { CamposproveedorService } from '../../services/camposproveedor.service';

import { Routes, RouterModule, Router } from '@angular/router';
import { DocumentsComponent } from '../documents/documents.component';
import { NgForm } from '@angular/forms';
import { DialogService } from '../dialog/dialog.service';
import { Respuesta } from '../models/respuesta';


const rutas: Routes = [
  { path: 'documentation', component: DocumentsComponent }
];

@NgModule({
  imports: [
    DocumentsComponent,
    RouterModule.forRoot(
      rutas,
      { enableTracing: true }
    )
  ],
  declarations: [],
  exports : [
    RouterModule
  ],
})

@Component({
  selector: 'app-classification',
  templateUrl: './classification.component.html',
  styleUrls: ['./classification.component.scss']
})
export class ClassificationComponent implements OnInit {

  @HostBinding('class') classes = 'div';

  segmento: string;
  familia: string;
  clase: string;
  producto: string;
  check = false;
  checkData = false;

  data: any = [];
  respuesta: any = {
    text: '',
    id: 0
  };
  clasificacionDatos: any = [];
  usuario: any;

  constructor( private clasificacionService: CamposproveedorService, private router: Router, private dialogService: DialogService) { }

  ngOnInit() {
    this.usuario = this.clasificacionService.getUsuario();
  }


  clear(userForm: NgForm) {
    userForm.reset();
  }

  buscar() {
   const parametros = {
    segmento: (this.segmento === undefined ? '' : this.segmento),
    familia: (this.familia === undefined ? '' : this.familia),
    clase: (this.clase === undefined ? '' : this.clase),
    producto: (this.producto === undefined ? '' : this.producto)
  };
    // tslint:disable-next-line: max-line-length
    this.clasificacionService.getClasificacion(parametros).subscribe(
      res => {
        this.data = res;
      },
      err => console.error(err)
      );
  }

  change(indice: any) {
    if ( this.clasificacionDatos.indexOf(indice) >= 0) {
      this.clasificacionDatos = this.clasificacionDatos.filter(function(i) { return i !== indice; });
    } else {
      this.clasificacionDatos.push(indice);
    }
  }

  guardarClasificacion() {
    if (this.clasificacionDatos.length > 0) {
      this.clasificacionService.saveClasificacion(this.clasificacionDatos).subscribe(
        res => {
           console.log(res);
           // this.router.navigateByUrl('/documentation');
           this.respuesta = res;
           this.router.navigate(['/documentation'], { queryParams: { id:  this.respuesta.id, estado: ''} });

        },
        err => console.error(err)
        );
    } else {
      this.dialogService.openModalOk('Error', 'Existen campos obligatorios, por favor verificar', () => {
        // tslint:disable-next-line: no-unused-expression
      });
    }
  }

}
