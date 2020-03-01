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
    if (this.usuario !== undefined) {
      this.autenticado = true;
      this.title = 'Bienvenido Usuario ' + this.usuario.usuario;
    } else {
      this.autenticado = false;
    }

  }

  login(userForm: NgForm) {
    console.log('login', userForm);

    if (userForm.valid) {
      this.services.logIn(userForm.value).subscribe(
        res => {
          this.usuario = res;
          console.log('usuario respuesta');
          this.title = 'Bienvenido Usuario ' + this.usuario.usuario;
          // tslint:disable-next-line: no-unused-expression
          this.autenticado = true;
          this.services.setUsuario(this.usuario);
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
