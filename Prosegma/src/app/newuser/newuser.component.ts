import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CamposproveedorService } from '../../services/camposproveedor.service';
import { DialogService } from '../dialog/dialog.service';
import { Router } from 'express';

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.scss']
})
export class NewuserComponent implements OnInit {


  // tslint:disable-next-line: max-line-length
  constructor(private toastr: ToastrService, private camposServices: CamposproveedorService, private dialogService: DialogService, private router: Router) {
  }

  ngOnInit() {
    console.log('usuario');
  }

}
