import { Component, OnInit, Input } from '@angular/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {

  @Input() titleEvaluation: string;
  @Input() descriptionEvaluation: string;
  @Input() show: boolean;
  @Input() showProvider: boolean;
  @Input() provider: string;

  today: Date;
  myDate: Date = new Date();
  semestre: string;

  format = 'MM';
  locale = 'en-US';
  formattedDate = formatDate(this.myDate, this.format, this.locale);

  constructor() {
    console.log('formattedDate : ' + this.formattedDate);
    if ( this.formattedDate !== '01' && this.formattedDate !== '02' &&
        this.formattedDate !== '03' && this.formattedDate !== '04' &&
        this.formattedDate !== '05' && this.formattedDate !== '06') {
          this.semestre = 'Semestre 2';
    } else {
      this.semestre = 'Semestre 1';
    }
  }

  ngOnInit() {
  }

}
