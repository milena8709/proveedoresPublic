import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CamposproveedorService } from '../../services/camposproveedor.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css']
})
export class IconsComponent implements OnInit {
  usuario: any;
  proveedor: any;
  estado: String;
 

  constructor(private toastr: ToastrService, private service: CamposproveedorService,private router: Router) { }

  ngOnInit() {

    this.usuario = this.service.getUsuario();
    if (this.usuario !== undefined) {
      this.service.getProveedorById(this.usuario.idusuario).subscribe(
        res => {
          // tslint:disable-next-line: no-unused-expression
          this.proveedor = res;
          switch (Number(this.proveedor.estado)) {
            case 0:
              this.estado = 'En Proceso';
              break;
            case 1:
              this.estado = 'Esperando respuesta de aceptacion';
            break;
            case 2:
              this.estado = 'Rechazado';
            break;
            default:
              this.estado = this.proveedor.estado;
              break;
          }
        },
        err => {
           this.showNotification('Error', 'Ocurrio un error al guardar, por favor intente mas tarde');
        });

    }
  }



  updatePsw(change: NgForm){
    if (change.valid) {
      this.service.updatePassword(change.value, this.usuario.idusuario).subscribe(
        res => {
          // tslint:disable-next-line: no-unused-expression
          this.router.navigateByUrl('/dashboard');
        },
        err => {
           this.showNotification('Error', 'Ocurrio un error al guardar, por favor intente mas tarde');
        });

    } else {

    }

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
