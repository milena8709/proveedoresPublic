import { Component, OnInit, HostBinding } from '@angular/core';
import { CamposproveedorService } from '../../services/camposproveedor.service';
import { SeleccionProveedor } from '../models/seleccionProveedor';
import { DialogService } from '../dialog/dialog.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  @HostBinding('class') classes = 'row';



titulo: string;
descripcion: string;
segmento: string;
familia: string;
clase: string;
producto: string;
nit: string;
cotizacion: string;
filtros = {};
proveedores:  any = [{}];
proveedoresConAHP: any = [];
proveedoresSinAHP: any = [];
proveedoresSave: SeleccionProveedor[] = [];



  // tslint:disable-next-line: max-line-length
  constructor(private toastr: ToastrService, private service: CamposproveedorService, private dialogService: DialogService, private router: Router) {}



  ngOnInit() {}


  buscar() {
    this.filtros = {
      titulo: this.titulo === undefined ? '' : this.titulo,
      descripcion: this.descripcion === undefined ? '' : this.descripcion,
      segmento: this.segmento === undefined ? '' : this.segmento,
      familia: this.familia === undefined ? '' : this.familia,
      clase: this.clase === undefined ? '' : this.clase,
      producto: this.producto === undefined ? '' : this.producto,
      nit: this.nit === undefined ? '' : this.nit,
      cotizacion: this.cotizacion === undefined ? '' : this.cotizacion
    };

    this.service.getSeleccionProveedor(this.filtros).subscribe(
      res => {
      this.proveedores = res;
      this.proveedoresSinAHP = this.proveedores;
      },
      err => console.error(err)
      );
  }

  changeConAHP(indice: any) {
    console.log('changeConAHP ', indice);
    if ( this.proveedoresConAHP.indexOf(indice) >= 0) {
      this.proveedoresConAHP = this.proveedoresConAHP.filter(function(i) { return i !== indice; });
      this.proveedoresSinAHP.push(indice);
    } else {
      if ( this.proveedoresSinAHP.indexOf(indice) >= 0) {
        this.proveedoresSinAHP = this.proveedoresSinAHP.filter(function(i) { return i !== indice; });
      }
      this.proveedoresConAHP.push(indice);
    }
  }

  changeSinAHP(indice: any) {
    if ( this.proveedoresSinAHP.indexOf(indice) >= 0) {
      this.proveedoresSinAHP = this.proveedoresSinAHP.filter(function(i) { return i !== indice; });
      this.proveedoresConAHP.push(indice);
    } else {
      this.proveedoresSinAHP.push(indice);
    }
  }


  saveSeleccionProveedor() {
    if (this.titulo !== undefined && this.descripcion !== undefined) {
      const tamProveedoresSelec = this.proveedoresSinAHP.length + this.proveedoresConAHP.length;
      if ( tamProveedoresSelec < 2 ) {
        this.dialogService.openModalOk('Error', 'Debe seleccionar mínimo 2 proveedores', () => {
        });
      } else {
        if ( this.proveedoresSinAHP.length > 0) {
          this.dialogService.openModal('Alerta', 'Ud seleccionó proveedores sin AHP, ¿Está seguro de guardar?', () => {
            // tslint:disable-next-line: no-unused-expression
            for (let index = 0; index < this.proveedoresSinAHP.length; index++) {
              const element = this.proveedoresSinAHP[index];
              this.proveedoresSave[index] = {};
              this.proveedoresSave[index].titulo = this.titulo;
              this.proveedoresSave[index].descripcion = this.descripcion;
              this.proveedoresSave[index].nit = element.nit;
              this.proveedoresSave[index].fecha_creacion = new Date().toDateString();
          }
          this.service.saveProveedoresSeleccionados(this.proveedoresSave).subscribe(
            res => {
              // tslint:disable-next-line: no-unused-expression
              this.router.navigateByUrl('/dashboard');
            },
            err => {
               this.showNotification('Error', 'Ocurrio un error al guardar, por favor intente mas tarde');
            }
            );
         }, () => {
          });
        } else {
          for (let index = 0; index < this.proveedoresConAHP.length; index++) {
            const element = this.proveedoresConAHP[index];
            this.proveedoresSave[index] = {};
            this.proveedoresSave[index].titulo = this.titulo;
            this.proveedoresSave[index].descripcion = this.descripcion;
            this.proveedoresSave[index].nit = element.nit;
            this.proveedoresSave[index].nombre = element.nombre;
            this.proveedoresSave[index].fecha_creacion = new Date().toDateString();

        }
       /* this.service.saveProveedoresSeleccionados(this.proveedoresSave).subscribe(
          res => {
            // tslint:disable-next-line: no-unused-expression
            // this.router.navigateByUrl('/criterion');*/
            this.service.setProveedores(this.proveedoresSave);
            this.router.navigate(['/criterion']);
          /*},
          err => {
             this.showNotification('Error', 'Ocurrio un error al guardar, por favor intente mas tarde');
          }
          );*/

        }
      }

    } else {
      this.dialogService.openModalOk('Alerta', 'Debe ingresar los campos título y descripción, campos obligatorios', () => {
      });
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
