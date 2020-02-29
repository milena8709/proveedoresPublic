import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-ok-template',
  templateUrl: './dialog-ok-template.component.html',
  styleUrls: ['./dialog-ok-template.component.scss']
})
export class DialogOkTemplateComponent  {

  modalTitle: string;
  modalMessage: string;
  // tslint:disable-next-line: no-use-before-declare
  modalType: ModalType = ModalType.INFO;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.modalTitle = data.title;
    this.modalMessage = data.message;
    this.modalType = data.type;
    console.log(data);
  }

}
export enum ModalType {
  INFO = 'info',
  WARN = 'warn'
}
