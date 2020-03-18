import { Component, OnInit, HostBinding } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CamposproveedorService } from '../../services/camposproveedor.service';
import { Router } from '@angular/router';
import { DialogService } from '../dialog/dialog.service';

declare const google: any;

interface Marker {
lat: number;
lng: number;
label?: string;
draggable?: boolean;
}
@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
    @HostBinding('class') classes = 'div';

  perfiles: any;
  perfilSeleccionado: string;
  usuarios: any;

  constructor(private service: CamposproveedorService, private router: Router, private dialogService: DialogService) { }

  ngOnInit() {
    console.log('perfiles');
    this.service.getPerfiles().subscribe(
      res => {
        this.perfiles = res;
        this.service.getCuenta().subscribe(
          // tslint:disable-next-line: no-shadowed-variable
          res => {
            this.usuarios = res;
          },
          err => console.error(err)
          );
      },
      err => console.error(err)
      );



  }

  saveCuenta(userForm: NgForm) {
    userForm.value.perfil = this.perfilSeleccionado;
    this.service.CreateNewAccounten(userForm.value).subscribe(
      res => {
        this.dialogService.openModalOk('Alerta', 'Cuenta de usuario guardada exitosamente', () => {
          // tslint:disable-next-line: no-unused-expression
          this.usuarios = res;
        userForm.reset();
       });
      },
      err => {
        this.dialogService.openModalOk('Error', 'Error al crear la cuenta', () => {
          // tslint:disable-next-line: no-unused-expression
        });
      }
      );
  }

  selectChange($event) {
    const perfil = this.perfiles.find( fruta => fruta.nombre === $event.toString());
    this.perfilSeleccionado = perfil.idperfil;
  }

}
