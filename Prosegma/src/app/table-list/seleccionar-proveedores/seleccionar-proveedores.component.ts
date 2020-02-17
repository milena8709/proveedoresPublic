import { Component, OnInit } from '@angular/core';
import { EvaluationService } from '../../../services/evaluation.service';
import { Router } from '@angular/router';
import { Proveedor } from '../../models/proveedor';

@Component({
  selector: 'app-seleccionar-proveedores',
  templateUrl: './seleccionar-proveedores.component.html',
  styleUrls: ['./seleccionar-proveedores.component.scss']
})
export class SeleccionarProveedoresComponent implements OnInit {

  proveedores: any[] = [];

  constructor(private evaluationService: EvaluationService, private router: Router) { }

  ngOnInit() {


      this.evaluationService.getProveedor().subscribe( (resp: any) => {
        this.proveedores = resp;
        console.log('Estos son los proveedores' + this.proveedores);
      });

  }

}
