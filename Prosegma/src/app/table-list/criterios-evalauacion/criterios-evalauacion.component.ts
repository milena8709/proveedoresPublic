import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CriteriosService } from '../../../services/criterios.service';

@Component({
  selector: 'app-criterios-evalauacion',
  templateUrl: './criterios-evalauacion.component.html',
  styleUrls: ['./criterios-evalauacion.component.scss']
})
export class CriteriosEvalauacionComponent implements OnInit {

  criterios: any[] = [];

  constructor(private criteriosService: CriteriosService, private router: Router) { }

  ngOnInit() {
    this.criteriosService.getEvaluation().subscribe( (resp) => {
      this.criterios = resp;
    });
  }

}
