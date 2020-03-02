import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { ClassificationComponent } from '../../classification/classification.component';
import { DocumentsComponent } from '../../documents/documents.component';
import { CriterionComponent } from '../../criterion/criterion.component';
import { AhpComponent } from '../../ahp/ahp.component';
import { MatClassificationComponent } from '../../mat-classification/mat-classification.component';
import { TransactionComponent } from '../../transaction/transaction.component';
import { MaterialdetailComponent } from '../../materialdetail/materialdetail.component';
import { GestionarTareaComponent } from '../../gestionar-tarea/gestionar-tarea.component';
import { NewuserComponent } from '../../newuser/newuser.component';
import { ResultSeleccionComponent } from '../../result-seleccion/result-seleccion.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { GestionarTransaccionComponent } from '../../gestionar-transaccion/gestionar-transaccion.component';


export const AdminLayoutRoutes: Routes = [

    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'classification',        component: ClassificationComponent },
    { path: 'documentation',        component: DocumentsComponent },
    { path: 'criterion',        component: CriterionComponent },
    { path: 'AhpComponent',        component: AhpComponent },
    { path: 'matclassification',        component: MatClassificationComponent },
    { path: 'transaction',        component: TransactionComponent },
    { path: 'materialdetail',        component: MaterialdetailComponent },
    { path: 'gestionartarea',        component: GestionarTareaComponent },
    { path: 'newuser',        component: NewuserComponent },
    { path: 'resultSeleccion',        component: ResultSeleccionComponent },
    { path: 'transaction/:id',        component: GestionarTransaccionComponent }
];
