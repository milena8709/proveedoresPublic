import { Component, OnInit, ViewChild, TemplateRef, HostBinding, enableProdMode, EventEmitter, Output, Input } from '@angular/core';
import * as Chartist from 'chartist';
import { CamposproveedorService } from '../../services/camposproveedor.service';
import { DialogService } from '../dialog/dialog.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm, Form } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  @HostBinding('class') classes = 'div';

  @Output() isLoging = new EventEmitter();

  sesion: Form;
  autenticado: boolean;
  title = 'Iniciar Sesión';
  usuario: any;
  exampleChild = 'ejemplo angular';
  message: string;
  changePsw:NgForm;



  // tslint:disable-next-line: max-line-length
  constructor(private modalService: NgbModal, private services: CamposproveedorService, private dialogService: DialogService, private router: Router) {
  }

  ngOnInit(): void {
    this.usuario = this.services.getUsuario();
    if (this.usuario !== undefined || localStorage.getItem('email')) {
      this.autenticado = true;
      this.title = 'Bienvenido, a la izquierda encontrará el menú de opciones.';
    } else {
      this.autenticado = false;
    }
  }

  callEventLoging() {
    this.isLoging.emit(this.autenticado);
    console.log('emite el evento');
  }

  login(userForm: NgForm) {


    if (userForm.valid) {
      this.services.logIn(userForm.value).subscribe(
        res => {
          this.usuario = res;
          console.log('usuario respuesta');
          this.title = 'Bienvenido, a la izquierda encontrará el menú de opciones.';
          // tslint:disable-next-line: no-unused-expression
          this.autenticado = true;
          console.log('este es el usuario ' + JSON.stringify(this.usuario));
          localStorage.setItem('email', this.usuario.usuario);
          localStorage.setItem('perfil', this.usuario.idperfil);
          this.services.setUsuario(this.usuario);
          window.location.reload();
        },
        err => {
          this.dialogService.openModalOk('Error', err.error.text, () => {
            // tslint:disable-next-line: no-unused-expression
            this.autenticado = false;
          });
        });
    } else {
      this.dialogService.openModalOk('Error', 'Por favor diligenciar todos los campos obligatorios', () => {
        // tslint:disable-next-line: no-unused-expression
      });
    }
  }
  
}
