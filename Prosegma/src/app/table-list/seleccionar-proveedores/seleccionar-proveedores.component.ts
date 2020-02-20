import { Component, OnInit, Input, Output } from '@angular/core';
import { EvaluationService } from '../../../services/evaluation.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-seleccionar-proveedores',
  templateUrl: './seleccionar-proveedores.component.html',
  styleUrls: ['./seleccionar-proveedores.component.scss']
})
export class SeleccionarProveedoresComponent implements OnInit {

  // @Input() providerSearch: any[] = [];

  @Output() sendProvider = new EventEmitter();

  usuario: Object = {
    id: null,
    name: null
  };


   proveedores: any[] = [];

  idProviderSelected: string;
  constructor(private evaluationService: EvaluationService, private router: Router) { }

  ngOnInit() {
      this.evaluationService.getProveedor().subscribe( (resp) => {
        this.proveedores = resp;
        console.log('Estos son los proveedores' + resp[0].idproveedor);
      });
  }

  selectProvider(id: string, input: boolean) {
    if ( input ) {
      this.idProviderSelected = id;
    } else {
      this.idProviderSelected = '';
    }
    this.callParentEvent();
  }

  callParentEvent() {
    this.sendProvider.emit(this.idProviderSelected);
  }

  buscar(forma: NgForm) {
    console.log(forma.form.value);
    this.evaluationService.getProveedorById(forma.form.value.id, forma.form.value.proveedor).subscribe( (resp) => {
      this.proveedores = resp;
    });
  }

}
