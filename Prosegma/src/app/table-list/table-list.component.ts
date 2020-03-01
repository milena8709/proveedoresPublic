import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EvaluationService } from '../../services/evaluation.service';
import { Router } from '@angular/router';
import { ProveedorEvalua } from '../models/proveedorEvalua';
import { CriteriosService } from '../../services/criterios.service';
import { EvaluationData } from '../models/evaluationData';
import { DataEvaluation } from '../models/DataEvaluation';


@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  header: Object = {
    tittle: null,
    description: null,
    idProvider: null,
    semester: null
  };

  proveedorEvalua: ProveedorEvalua = {
    tittle: null,
    description: null,
    idProvider: null,
    totalScore: null,
    criterios: [{}],
    data: [{}]
  };

  criteriosDescription: EvaluationData[] = [{
  }];

  data: DataEvaluation[] = [];
  totalScore: number;
  messageData: string;

  idProvider: string;
  nameProvider: string;

  firstStep = true;
  secondStep = false;
  thirdStep = false;
  fourStep = false;

  criterios: any[] = [];

  showSearchEvaluation = true;

  showSearchEvaluationComponent = false;

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
          this.changeCard();
    } else {
      console.log('no se puede registrar la evaluacion porque no ha seleccioando todos los campos');
    }

  }

  createCreteria(formData: NgForm) {
    // console.log(this.criterios);
    this.data = [];
    this.totalScore = 0;
    for  (let i = 0; i < this.criterios.length; i++ ) {

      const data = new DataEvaluation();

      data.criteria = this.criterios[i].criterio;

      const number1 = +this.criterios[i].peso;
      const numer2 = +formData.form.value[i + 1];
      const total = (number1 / 100) * numer2;

      data.scoreResult = total;

      if ( total < 4 ) {
        data.notes = 'Rendimiento Bajo';
      } else if ( 5 <= total && total < 9) {
        data.notes = 'Rendimiento Medio';
      } else if ( 9 < total) {
        data.notes = 'Rendimiento alto';
      }
      this.totalScore += total;
      this.data.push(data);
    }

    if ( this.totalScore < 4 ) {
      this.messageData = 'Rendimiento Bajo';
    } else if ( 5 <= this.totalScore && this.totalScore < 9) {
      this.messageData = 'Rendimiento Medio';
    } else if ( 9 < this.totalScore) {
      this.messageData = 'Rendimiento alto';
    }
    console.log('data ' + this.data);
    this.proveedorEvalua.totalScore = this.totalScore;
    this.proveedorEvalua.criterios = this.criterios;
    this.proveedorEvalua.data = this.data;
    this.changeCardthird();
  }

  selectedProvider( id: string) {
    if ( id != null && id !== '') {
      this.idProvider = id;
    }
    // console.log('Este es el usuario seleccionado desde el padre ' + id );
  }

  takeNameProvider( name: string ) {
    if ( name != null && name !== '') {
      this.nameProvider = name;
      console.log('Nombre proveedor :: ' + this.nameProvider);
    }
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

  guardar() {
    this.evaluationService.createEvaluation(this.proveedorEvalua).subscribe(
      res => {
        // tslint:disable-next-line: no-unused-expression
        console.log('Se crea evalaucion..... ');
      },
      err => console.error(err)
      );

      this.firstStep = true;
      this.secondStep = false;
      this.thirdStep = false;
      this.fourStep = false;
  }

  showSearch(show: boolean) {
    this.showSearchEvaluation = false;
    this.showSearchEvaluationComponent = true;

  }

  noShowSearch() {
    this.showSearchEvaluation = true;
    this.showSearchEvaluationComponent = false;
  }
}
