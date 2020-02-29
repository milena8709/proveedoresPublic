import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CamposproveedorService } from '../../services/camposproveedor.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.scss']
})
export class NewuserComponent implements OnInit {


  // tslint:disable-next-line: max-line-length
  constructor(private toastr: ToastrService, private services: CamposproveedorService, private router: Router) {
  }

  ngOnInit() {
    console.log('usuario');
  }

  saveUser(usuario: NgForm) {
    if (usuario.valid) {
    this.services.saveUsuario(usuario.value).subscribe(
      res => {
        // tslint:disable-next-line: no-unused-expression
        this.router.navigateByUrl('/dashboard');
      },
      err => {
         this.showNotification('Error', 'Ocurrio un error al guardar, por favor intente mas tarde');
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


