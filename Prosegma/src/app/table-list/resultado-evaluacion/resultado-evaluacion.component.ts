import { Component, OnInit, Input } from '@angular/core';
import { EvaluationData } from '../../models/evaluationData';
import { DataEvaluation } from '../../models/DataEvaluation';

@Component({
  selector: 'app-resultado-evaluacion',
  templateUrl: './resultado-evaluacion.component.html',
  styleUrls: ['./resultado-evaluacion.component.scss']
})
export class ResultadoEvaluacionComponent implements OnInit {

  @Input() criteriaScore: EvaluationData[] = [];
  @Input() resultCriteria: DataEvaluation[] = [];
  @Input() resultTotal: number;
  @Input() message: string;

  constructor() {
    for  (let i = 0; i < this.resultCriteria.length; i++ ) {
    }

   }

  ngOnInit() {
      console.log(this.resultCriteria[0].scoreResult);
  }

}
