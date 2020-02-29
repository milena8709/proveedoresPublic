import { Component, OnInit, Output, EventEmitter, Input, ViewChild, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EvaluationService } from '../../../services/evaluation.service';
import { ProveedorEvalua } from '../../models/proveedorEvalua';
import { DialogService } from '../../dialog/dialog.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-buscar-evaluaciones',
  templateUrl: './buscar-evaluaciones.component.html',
  styleUrls: ['./buscar-evaluaciones.component.scss']
})
export class BuscarEvaluacionesComponent implements OnInit {

  @Output() showComponent = new EventEmitter();

  mostrar = false;

  @Input() showComponentTwo: boolean;

  evaluation: ProveedorEvalua = {
    idProvider: null,
    name: null,
    date: null,
    semester: null
  };

  evaluations: any [] = [];

  evaluationsByDetail: any [] = [];
  @ViewChild('secondDialog', { static: true }) secondDialog: TemplateRef<any>;

  constructor(private evaluationService: EvaluationService, private dialogService: DialogService, private dialog: MatDialog) { 
    this.evaluation.idProvider = '';
    this.evaluation.name = '';
    this.evaluation.date = '';
    this.evaluation.semester  = '';
  }

  ngOnInit() {
  }


  seachEvaluation(forma: NgForm) {
    if ( forma.form.value.id !== null && forma.form.value.id !== '') {
      this.evaluation.idProvider = forma.form.value.id;
    } else {
      this.evaluation.idProvider = '';
    }
    if ( forma.form.value.name !== null && forma.form.value.name !== '') {
      this.evaluation.name = forma.form.value.name;
    } else {
      this.evaluation.name = '';
    }
    if ( forma.form.value.date !== null && forma.form.value.date !== '') {
      this.evaluation.date = forma.form.value.date;
    } else {
      this.evaluation.date = '';
    }
    if ( forma.form.value.semester !== null && forma.form.value.semester !== '') {
      this.evaluation.semester = forma.form.value.semester;
    } else {
      this.evaluation.semester  = '';
    }
    console.log(this.evaluation);
    this.showSearch();
    this.evaluationService.getEvaluation(this.evaluation).subscribe( (resp) => {
      this.evaluations = resp;
      console.log('Estas son las evaluacion ' + resp);
    }, ( errorServicio ) => {
      this.evaluations = [];
    });
}

    // this.showSearch();

  showSearch() {
    this.mostrar = true;
    this.callParentEvent();
  }

  callParentEvent() {
    this.showComponent.emit(this.mostrar);
  }

  mostrarDetalle(){
    console.log('moasds');
  }

  openModalDetalles(id: string, titulo: string, year: string) {
    //console.log(id + ' ' + titulo + ' ' + year.substr(0,3));

    let object = {
      id: null,
      titulo: null,
      year: null
    };
    object.id = id;
    object.titulo = titulo;
    object.year = year.substr(0,4);
    this.evaluationService.getEvaluationByDetail(object).subscribe( (resp) => {
      this.evaluationsByDetail = resp;
      this.dialog.open(this.secondDialog);
        // tslint:disable-next-line: prefer-const
        /*this.dialogService.openModalDetalles(this.evaluationsByDetail[0].titulo, this.evaluationsByDetail, () => {
          // tslint:disable-next-line: no-unused-expression
          console.log('Entra aqui 1');
        }, () => {
          console.log('Entra aqui 2');
        });*/

      console.log('Estas son las evaluacion ' + JSON.stringify(this.evaluationsByDetail[0]));


    }, ( errorServicio ) => {
      console.log('Estas son las evaluacion ' + errorServicio);
    });

  }

}
