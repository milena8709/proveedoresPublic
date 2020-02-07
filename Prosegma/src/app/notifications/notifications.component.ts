import { Component, OnInit, HostBinding } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CamposproveedorService } from '../../services/camposproveedor.service';
import { CamposProveedor } from '../models/camposproveedor';
import { Combobox } from '../models/combobox';
import { Checkbox } from '../models/checkbox';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  @HostBinding('class') classes = 'row';

  title = 'ng-bootstrap-modal-demo';
  closeResult: string;

  campos: any = [];

  texto = 1;
  textField = 2;
  combobox = 3;
  checkbox = 4;
  button = 5;

  campoTexto: string[] = [];
  campoTextField: string[] = [];
  campoCombo: Combobox[] = [];
  campoCheck: Checkbox[] = [];
  campoboton: string[] = [];


  ngOnInit() {
    this.camposServices.getCamposProveedor(1).subscribe(
      res => {
      this.campos.push(res);
      this.crearCampos();
      // tslint:disable-next-line: no-console
      console.info('prueba ngOnInit notifiction.component.ts');
      },
      err => console.error(err)
      );

  }

    crearCampos() {
      for (const campo of this.campos[0]) {
        switch (campo.idtipocampo) {
          case this.texto:
            this.campoTexto.push(campo.label);
            break;
          case this.textField:
            this.campoTextField.push(campo.label);
            break;
          case this.combobox:
            this.campoCombo.push(campo.label);
            break;
          case this.checkbox:
            this.campoCheck.push(campo.label);
            break;
          case this.button:
            this.campoboton.push(campo.label);
            break;
         default:
            break;
        }
      }
    }


  constructor(private toastr: ToastrService, private camposServices: CamposproveedorService) {}
  showNotification(from, align) {

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
