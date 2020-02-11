import { Component, OnInit, HostBinding, OnChanges, SimpleChanges, NgModule } from '@angular/core';
import { CamposproveedorService } from '../../services/camposproveedor.service';

import { Routes, RouterModule, Router } from '@angular/router';
import { DocumentsComponent } from '../documents/documents.component';


const rutas: Routes = [
  { path: 'documentation/:clasificacion', component: DocumentsComponent }
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


  @HostBinding('class') classes = 'row';

  segmento: string;
  familia: string;
  clase: string;
  producto: string;
  check = false;
  checkData = false;

  data: any = [];
  clasificacionDatos: any = [];

  constructor( private clasificacionService: CamposproveedorService, private router: Router) { }

  ngOnInit() {
  }


  buscar() {
   // tslint:disable-next-line: prefer-const

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
      this.clasificacionDatos = this.clasificacionDatos.filter(function(i) { return i !== indice });
    } else {
      this.clasificacionDatos.push(indice);
    }
  }

  guardarClasificacion() {
    this.clasificacionService.saveClasificacion(this.clasificacionDatos).subscribe(
      res => {
         console.log(res);
         this.router.navigateByUrl('/documentation', this.clasificacionDatos);
      },
      err => console.error(err)
      );
  }

}
