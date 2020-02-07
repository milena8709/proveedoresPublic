import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {
  ngOnInit(): void {
  }

  constructor(private toastr: ToastrService) {}
  showNotification(from, align) {

      const color = Math.floor((Math.random() * 5) + 1);

        this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span> Usted realizará una selección de proveedor para la licitación/clasificación. <b>123456</b>', '', {
           timeOut: 8000,
           closeButton: true,
           enableHtml: true,
           toastClass: 'alert alert-success alert-with-icon',
           positionClass: 'toast-' + from + '-' +  align
         });
        }
}
