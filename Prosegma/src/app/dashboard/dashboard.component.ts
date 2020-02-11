import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import * as Chartist from 'chartist';
import { CamposproveedorService } from '../../services/camposproveedor.service';
import { DialogService } from '../dialog/dialog.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  ngOnInit(): void {
  }

  constructor(private modalService: NgbModal, private dialogService: DialogService) {

  }
  /*constructor(private camposServices: CamposproveedorService) {
}

  ngOnInit() {

  }*/

}
