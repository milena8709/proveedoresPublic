import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CamposproveedorService } from '../../services/camposproveedor.service';
import { DialogService } from '../dialog/dialog.service';
const AHP = require('ahp');

@Component({
  selector: 'app-result-seleccion',
  templateUrl: './result-seleccion.component.html',
  styleUrls: ['./result-seleccion.component.scss']
})



export class ResultSeleccionComponent implements OnInit {
  @HostBinding('class') classes = 'div';
  criterios: any = [];
  proveedores: any;
  titulo: any;
  descripcion: any;
  values: any;
  value: number;
  estado: string;
  ahpContext = new AHP();

  // tslint:disable-next-line: max-line-length
  constructor(private dialogService: DialogService, private toastr: ToastrService, private route: ActivatedRoute, private router: Router, private service: CamposproveedorService) { }

  ngOnInit() {
    this.values = this.route
    .queryParams
    .subscribe(params => {
      // Defaults to 0 if no query param provided.
      this.value = +params['id'] || 0;
    });

    this.service.getCriterios().subscribe(
      res => {
        this.criterios = res;
      },
      err => console.error(err)
      );

    this.proveedores = this.service.getProveedores();
    this.ahpContext.addItems(this.proveedores);

    this.ahpContext.addCriteria(this.criterios);

    for (let index = 0; index < this.proveedores.length; index++) {
      const element = this.proveedores[index];
      element.porcentaje = this.getAhp();
    }
    this.titulo = this.proveedores[0].titulo;
    this.descripcion = this.proveedores[0].descripcion;

    this.proveedores.sort(function (a, b) {
      if (a.porcentaje < b.porcentaje) {
        return 1;
      }
      if (a.porcentaje > b.porcentaje) {
        return -1;
      }
      return 0;
    });
    this.proveedores[0].nombre = this.proveedores[0].nombre + ' (Seleccionado)';

          // tslint:disable-next-line: prefer-const
          let tarea: any = {};
          tarea.id_proveedor = this.proveedores[0].nit,
          tarea.fecha_creacion = new Date().toString(),
          tarea.estado = 'activa';
           this.service.saveExistingTask(tarea).subscribe(res => {
             console.log('tarea creada');
           }, err => {
             this.dialogService.openModalOk('Error', err.error.text, () => {
             });
           });

  }

getRanking(){
  this.ahpContext.rankCriteriaItem(
    this.criterios[0],
    [
        [this.proveedores[0], this.proveedores[1], 10 / 5],
        [this.proveedores[0], this.proveedores[1], 10 / 7],
        [this.proveedores[0], this.proveedores[1], 5 / 7]
    ]
);
}


  getAhp() {
    this.getRanking();
    return 10 * Math.round(Math.random() * 10);
  }


  saveResultadoProveedor() {
    this.service.saveResultProveedores(this.proveedores, this.value).subscribe(
      res => {
        // tslint:disable-next-line: no-unused-expression
        this.router.navigateByUrl('/user-profile', );
        this.showNotification('Información', 'Datos Guardados exitosamente');
      },
      err => {
         this.showNotification('Error', 'Ocurrio un error al guardar, por favor intente mas tarde');
      }
      );
  }


  showNotification(from: string, align: string) {

    const color = Math.floor((Math.random() * 5) + 1);

      this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span> Su registro está <b>Pendiente</b> - de aprobación.', '', {
         timeOut: 8000,
         closeButton: true,
         enableHtml: true,
         toastClass: 'alert alert-success alert-with-icon',
         positionClass: 'toast-' + from + '-' +  align
       });
      }

}
