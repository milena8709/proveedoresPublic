import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EvaluationService } from '../../../services/evaluation.service';
import { ProveedorEvalua } from '../../models/proveedorEvalua';

@Component({
  selector: 'app-buscar-evaluaciones',
  templateUrl: './buscar-evaluaciones.component.html',
  styleUrls: ['./buscar-evaluaciones.component.scss']
})
export class BuscarEvaluacionesComponent implements OnInit {

  @Output() showComponent = new EventEmitter();

  mostrar: boolean;

  evaluation: ProveedorEvalua = {
    idProvider: null,
    name: null,
    date: null,
    semester: null
  };

  constructor(private evaluationService: EvaluationService) { }

  ngOnInit() {
  }


  seachEvaluation(forma: NgForm) {
    this.evaluation.idProvider = forma.form.value.id;
    this.evaluation.name = forma.form.value.name;
    this.evaluation.date = forma.form.value.date;
    this.evaluation.semester = forma.form.value.semester;
    console.log(this.evaluation);
    this.evaluationService.getEvaluation(this.evaluation).subscribe( (resp) => {
      console.log('Estas son las evaluacion ' + resp);
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

}
