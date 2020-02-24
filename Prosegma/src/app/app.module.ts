import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { DialogTemplateComponent } from './dialog-template/dialog-template.component';
import { DialogOkTemplateComponent } from './dialog-ok-template/dialog-ok-template.component';
import { DocumentsComponent } from './documents/documents.component';

import { MostrarEvaluacionesComponent } from './table-list/mostrar-evaluaciones/mostrar-evaluaciones.component';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    NgbModule,
    ToastrModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
  BrowserAnimationsModule,
  FormsModule,
  ReactiveFormsModule,
  MatInputModule,
  MatFormFieldModule,
  MatDialogModule,
  MatFormFieldModule,
   MatButtonModule,
    MatInputModule  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    DialogTemplateComponent,
    DialogOkTemplateComponent  ],


  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[DialogTemplateComponent, DialogOkTemplateComponent]
})
export class AppModule { }
