import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { CamposproveedorService } from '../../services/camposproveedor.service';
import { Proveedor } from '../models/proveedor';

@Component({
  selector: 'app-ahp',
  templateUrl: './ahp.component.html',
  styleUrls: ['./ahp.component.scss']
})
export class AhpComponent implements OnInit {
  proveedores: any;
  criterios: any = [];
  total = 0;
  respuesta: any;

  // tslint:disable-next-line: max-line-length
  constructor(private toastr: ToastrService, private route: ActivatedRoute, private router: Router, private service: CamposproveedorService) { }
  titulo: string;
  descripcion: string;

  ngOnInit() {
     this.proveedores = this.service.getProveedores();
     this.titulo = this.proveedores[0].titulo;
     this.descripcion = this.proveedores[0].descripcion;
     this.service.getCriterios().subscribe(
      res => {
        this.criterios = res;
      },
      err => console.error(err)
      );

  }

  change(e) {

  }


  showNotification(from, align) {

      const color = Math.floor((Math.random() * 5) + 1);

        this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span> El proveedor seleccionado es <b>Proveedor de prueba</b> - aceptado.', '', {
           timeOut: 8000,
           closeButton: true,
           enableHtml: true,
           toastClass: 'alert alert-success alert-with-icon',
           positionClass: 'toast-' + from + '-' +  align
         });
   }


        saveSeleccionProveedor() {

             this.service.saveProveedoresSeleccionados(this.proveedores).subscribe(
          res => {
            this.respuesta = res;
            // tslint:disable-next-line: no-unused-expression
            // this.router.navigateByUrl('/criterion');
            this.service.setProveedores(this.proveedores);
            this.router.navigate(['/resultSeleccion'], { queryParams: { id:  this.respuesta.id} });
          },
          err => {
             this.showNotification('Error', 'Ocurrio un error al guardar, por favor intente mas tarde');
          }
          );
        }

}
