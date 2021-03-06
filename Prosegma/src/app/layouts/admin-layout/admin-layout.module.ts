import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { ClassificationComponent } from '../../classification/classification.component';
import { DocumentsComponent } from '../../documents/documents.component';
import { CriterionComponent } from '../../criterion/criterion.component';
import { AhpComponent } from '../../ahp/ahp.component';
import { MatClassificationComponent } from '../../mat-classification/mat-classification.component';
import { TransactionComponent } from '../../transaction/transaction.component';
import { MaterialdetailComponent } from '../../materialdetail/materialdetail.component';

import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

import { HttpClientModule } from '@angular/common/http';

import { CamposproveedorService } from '../../../services/camposproveedor.service';
import { NewuserComponent } from '../../newuser/newuser.component';
import { ResultSeleccionComponent } from '../../result-seleccion/result-seleccion.component';

import { EvaluationService } from '../../../services/evaluation.service';

import { BuscarEvaluacionesComponent } from '../../table-list/buscar-evaluaciones/buscar-evaluaciones.component';
import { SeleccionarProveedoresComponent } from '../../table-list/seleccionar-proveedores/seleccionar-proveedores.component';
import { CriteriosEvalauacionComponent } from '../../table-list/criterios-evalauacion/criterios-evalauacion.component';
import { CalificacionCriterioComponent } from '../../table-list/calificacion-criterio/calificacion-criterio.component';
import { ResultadoEvaluacionComponent } from '../../table-list/resultado-evaluacion/resultado-evaluacion.component';
import { TitleComponent } from '../../table-list/title/title.component';
import { CriteriosService } from '../../../services/criterios.service';
import { ProvidersService } from '../../../services/proveedores.service';
import { FindProveedoresComponent } from '../../mat-classification/find-proveedores/find-proveedores.component';
import { TransactionService } from '../../../services/transaction.service';
import { GestionarTransaccionComponent } from '../../gestionar-transaccion/gestionar-transaccion.component';
import { GestionarTareaComponent } from '../../gestionar-tarea/gestionar-tarea.component';
import { BuscarTareasComponent } from '../../buscarTareas/buscarTareas.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ChartsModule,
    NgbModule,
    ToastrModule.forRoot(),
    HttpClientModule
  ],
  providers: [
    CamposproveedorService,
    EvaluationService,
    CriteriosService,
    ProvidersService,
    TransactionService
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    BuscarTareasComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    ClassificationComponent,
    DocumentsComponent,
    CriterionComponent,
    AhpComponent,
    MatClassificationComponent,
    TransactionComponent,
    MaterialdetailComponent,
    NewuserComponent,
    ResultSeleccionComponent,
    BuscarEvaluacionesComponent,
    SeleccionarProveedoresComponent,
    CriteriosEvalauacionComponent,
    CalificacionCriterioComponent,
    ResultadoEvaluacionComponent,
    TitleComponent,
    FindProveedoresComponent,
    GestionarTransaccionComponent,
    GestionarTareaComponent
  ]
})

export class AdminLayoutModule {}
