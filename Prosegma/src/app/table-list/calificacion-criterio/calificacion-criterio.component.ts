import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CriteriosService } from '../../../services/criterios.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-calificacion-criterio',
  templateUrl: './calificacion-criterio.component.html',
  styleUrls: ['./calificacion-criterio.component.scss']
})
export class CalificacionCriterioComponent implements OnInit {

  @Output() sendProvider = new EventEmitter();

  criterios: any[] = [];

  constructor(private criteriosService: CriteriosService) { }

  ngOnInit() {
    this.criteriosService.getEvaluation().subscribe( (resp) => {
      this.criterios = resp;
    });
  }


}
