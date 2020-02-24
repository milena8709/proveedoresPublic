import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import * as Chartist from 'chartist';
import { CamposproveedorService } from '../../services/camposproveedor.service';
import { DialogService } from '../dialog/dialog.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  ngOnInit(): void {
  }

  // tslint:disable-next-line: max-line-length
  constructor(private modalService: NgbModal, private services: CamposproveedorService, private dialogService: DialogService, private router: Router) {

  }



  login(userForm: NgForm) {
    console.log('login', userForm);
    if (userForm.valid) {
      this.services.logIn(userForm.value);
    } else {
      this.dialogService.openModalOk('Error', 'Por favor diligenciar todos los campos obligatorios', () => {
        // tslint:disable-next-line: no-unused-expression
      });
    }
  }
  /*constructor(private camposServices: CamposproveedorService) {
}

  ngOnInit() {

  }*/

}
