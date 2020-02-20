import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EvaluationService } from '../../services/evaluation.service';
import { Router } from '@angular/router';
import { ProveedorEvalua } from '../models/proveedorEvalua';
import { CriteriosService } from '../../services/criterios.service';
import { EvaluationData } from '../models/evaluationData';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  header: Object = {
    tittle: null,
    description: null,
    idProvider: null
  };

  proveedorEvalua: ProveedorEvalua = {
    tittle: null,
    description: null,
    idProvider: null
  };

  criteriosDescription: EvaluationData[] = [{
    criteriaScore: null
  }];


  idProvider: string;
  firstStep = true;
  secondStep = false;
  thirdStep = false;
  fourStep = false;

  criterios: EvaluationData[] = [];

  constructor(private evaluationService: EvaluationService, private criteriosService: CriteriosService) { }

  ngOnInit() {
    this.criteriosService.getEvaluation().subscribe( (resp) => {
      this.criterios = resp;
    });
  }


  createEvaluation(form: NgForm) {
    form.form.value.idProvider = this.idProvider;
    this.proveedorEvalua.tittle = form.form.value.tittle;
    this.proveedorEvalua.description = form.form.value.description;
    this.proveedorEvalua.idProvider = form.form.value.idProvider;

    if (this.proveedorEvalua.tittle != null && this.proveedorEvalua.tittle !== ''
      && this.proveedorEvalua.description != null && this.proveedorEvalua.description !== ''
      && this.proveedorEvalua.idProvider != null && this.proveedorEvalua.idProvider !== '') {

       /* this.evaluationService.createEvaluation(this.proveedorEvalua).subscribe(
          res => {
            // tslint:disable-next-line: no-unused-expression
            console.log('Se crea evalaucion..... ' + form.form.value);
          },
          err => console.error(err)
          );*/
          this.changeCard();
    } else {
      console.log('no se puede registrar la evaluacion porque no ha seleccioando todos los campos');
    }

  }

  createCreteria(formData: NgForm) {
    console.log(formData.form);
    
    this.changeCardthird();
  }

  selectedProvider( id: string ) {
    if ( id != null && id !== '') {
      this.idProvider = id;
    }
    // console.log('Este es el usuario seleccionado desde el padre ' + id );
  }


  changeCard() {
    if ( this.firstStep ) {
      this.firstStep = false;
      this.secondStep = true;
    } else {
      this.firstStep = true;
      this.secondStep = false;
    }
  }

  changeCardsecond() {
    if ( this.secondStep ) {
      this.secondStep = false;
      this.thirdStep = true;
    } else {
      this.secondStep = true;
      this.thirdStep = false;
    }
  }

  changeCardthird() {
    if ( this.thirdStep ) {
      this.thirdStep = false;
      this.fourStep = true;
    } else {
      this.thirdStep = true;
      this.fourStep = false;
    }
  }
}
