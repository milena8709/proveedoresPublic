import { Injectable } from '@angular/core';
import { DialogTemplateComponent } from '../dialog-template/dialog-template.component';
import { DialogOkTemplateComponent } from '../dialog-ok-template/dialog-ok-template.component';
import { MatDialog, MatDialogConfig } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog: MatDialog) { }

  openModal(title: string, message: string, yes: Function = null, no: Function = null) {
    const dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
        title: title,
        message: message
    };
    dialogConfig.minWidth = 400;

    const dialogRef = this.dialog.open(DialogTemplateComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        if(yes){
          yes();
        }
      } else {
        if (no) {
          no();
        }
      }
    });
  }


  openModalOk(title: string, message: string, yes: Function = null) {
    const dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
        title: title,
        message: message
    };
    dialogConfig.minWidth = 400;

    const dialogRef = this.dialog.open(DialogOkTemplateComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (yes) {
          yes();
        }
      }
    });
  }

  openModalDetalles(title:string, message: any[], yes:Function = null, no:Function = null) {
    const dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
        title: title,
        message: message[0].criterio
    };
    dialogConfig.minWidth = 400;

    const dialogRef = this.dialog.open(DialogTemplateComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        if(yes){
          yes();
        }
      } else {
        if (no) {
          no();
        }
      }
    });
  }
}
