import { Component, OnInit, HostBinding, ViewChild, TemplateRef, SimpleChanges, OnChanges, NgModule } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CamposproveedorService } from '../../services/camposproveedor.service';
import { CamposProveedor } from '../models/camposproveedor';
import { Combobox } from '../models/combobox';
import { Checkbox } from '../models/checkbox';
import { Catalogo } from '../models/catalogo';
import { DialogService } from '../dialog/dialog.service';
import { Constantes } from '../models/constantes';
import { isInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { Proveedor } from '../models/proveedor';
import { TextField } from '../models/textField';
import { Datos } from '../models/dato';
import {Router} from '@angular/router';
import { RouterModule, Routes } from '@angular/router';
import { ClassificationComponent } from '../classification/classification.component';
import { NgForm } from '@angular/forms';


const rutas: Routes = [
  { path: 'clasificacion', component: ClassificationComponent }
];

@NgModule({
  imports: [
    ClassificationComponent,
    RouterModule.forRoot(
      rutas,
      { enableTracing: true }
    )
  ],
  declarations: [],
  exports :[
    RouterModule
  ],
})

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  [x: string]: any;
  @HostBinding('class') classes = 'row';
  checkpoliticas: any;
  formulario: any;

  campos: any = [];

  texto = 1;
  textField = 2;
  combobox = 3;
  checkbox = 4;
  button = 5;

  campoTexto: TextField[] = [];
  campoTexto_model: string[] = [];
  campoTextField: TextField[] = [];
  campoCombo: Combobox[] = [];
  campoCheck: Checkbox[] = [];
  campoboton: string[] = [];
  itemcombo: any = {};
  itemcheck: any = {};
  itemtextfield: any = {};
  itemtexto: any = {};
  proveedor: Proveedor[] = [{
    idProveedor: 0,
    licitacion: '',
    razonsocial: '',
    identicicacion: '',
    datos: [{
      dato: '',
      idcamposproveedor: 0,
      idinscripcion: 0
    }]
  }];

  licitacion: string;
  razonsocial: string;
  identificacion: string;

  constantes: Constantes = { politica: 'POLÍTICA DE TRATAMIENTO DE DATOS PERSONALES    En cumplimiento de la ley 1581 de 2012, Colombia Compra Eficiente publica la política de protección de Datos Personales y aclara lo siguiente:   Las Entidades Públicas son las Responsables del Tratamiento de los Datos Personales asociada a sus procesos de contratación en el SECOP. Colombia Compra Eficiente, como dueño y administrador de los sistemas de información de la Compra Publica, cumple el rol de Encargado de Tratamiento definido en la Ley 1581 de 2012, donde se limita a publicar la información registrada por las Entidades Públicas y, por ende, no tiene poder de decisión para la eliminación o modificación de los Datos Personales.    En dado caso de que una persona considere que se está afectando su derecho de Privacidad por el mal Tratamiento de Datos Personales, debe hacer un reclamo a la Entidad dueña del proceso de contratación para que cambie la información u oculte los Datos Personales en los documentos cargados en el SECOP. Si la Entidad no sabe o no puede cambiar la información en los sistemas de información, la entidad puede comunicarse con la mesa de servicio de Colombia Compra Eficiente para brindarle el apoyo correspondiente.    Los nombres, apellidos y numero de cedula o identificación de contratistas al igual que el monto del valor del contrato no podrán en ningún caso ser ocultados, dado que constituyen información vital para el cumplimiento del principio de Transparencia.  Las Entidades Públicas no requieren de una autorización para la recolección y tratamiento de Datos Personales cuando estos son necesarios para el ejercicio de sus funciones.    Colombia Compra Eficiente presenta la clasificación de Datos Personales y algunos ejemplos brindados por la Superintendencia de Industria y Comercio:    Dato Público: Dato que no es semiprivado, privado o sensible (Ej. Datos relativos al estado civil de las personas, su profesión u oficio, su calidad de comerciante o servidor público y aquellos que pueden obtenerse sin reserva alguna).    Dato semiprivado: Dato que no tiene naturaleza íntima, reservada, ni pública y cuyo conocimiento interesa al titular y a cierto sector o grupo de personas o a la sociedad en general (Ej. Datos financieros y crediticios, dirección, teléfono, correo electrónico personal).    Datos privados:  Dato que solo es relevante para su titular (Ej. fotografías, videos, Datos relacionados con su estilo de vida.) Datos sensibles: Aquellos Datos que afectan la intimidad de las personas o cuyo uso indebido puede generar discriminación. (Ej. Origen racial o étnico, orientación política, convicciones filosóficas o religiosas, pertenencia a sindicatos u organizaciones sociales o de derechos humanos, datos de salud, vida sexual y biométricos).  Por último, Colombia Compra Eficiente recuerda que no es la encargada de atender los reclamos asociados a la protección de Datos Personales de procesos de contratación que no sea dueño. En dado caso de querer hacer un reclamo sobre Datos Personales, dirigirla a la entidad Responsable del Tratamiento.', 
  mensaje: 'Debe aceptar las politicas de privacidad, ¿desea aceptarlas?'};
  camposformulario: any[] = [];

  // tslint:disable-next-line: max-line-length
  constructor(private toastr: ToastrService, private camposServices: CamposproveedorService, private dialogService: DialogService, private router: Router) {
  }


  ngOnInit() {
    this.camposServices.getCamposProveedor().subscribe(
      res => {
      this.campos.push(res);
      this.crearCampos();
      },
      err => console.error(err)
      );

  }

    crearCampos() {
      this.indice = 0;
      for (const campo of this.campos[0]) {
        switch (campo.idtipocampo) {
          case this.texto:
           this.itemtexto.id = campo.idcamposproveedor;
           this.itemtexto.label = campo.label;
           this.itemtexto.nombre =  campo.label;
           this.itemtexto.obligatorio = (campo.obligatorio === 1);
           this.campoTexto.push(this.itemtexto);
           this[campo.label] = '';
            break;
          case this.textField:
           this.itemtextfield.id = campo.idcamposproveedor;
           this.itemtextfield.label = campo.label;
           this.itemtextfield.nombre =  campo.label;
           this.itemtextfield.obligatorio = (campo.obligatorio === 1);
           this.campoTextField.push(this.itemtextfield);
           this[campo.label] = '';
            break;
          case this.combobox:
           this.camposServices.getCatalogoById(campo.idcamposproveedor).subscribe(
            res => {
              this.itemcombo = {};
              this.itemcombo.id = campo.idcamposproveedor;
              this.itemcombo.label = campo.label;
              this.itemcombo.nombre = campo.label;
              this.itemcombo.obligatorio = (campo.obligatorio === 1);
              this.itemcombo.catalogo =  [];
              this.itemcombo.catalogo = res;
              this.campoCombo.push(this.itemcombo);
            },
            err => console.error(err)
            );
         //   this.campoCombo.push(this.itemcombo);
            this[campo.label] = '';
            break;
          case this.checkbox:
          //  this.campoCheck.push(campo.label);
          this.itemcheck.id = campo.idcamposproveedor;
           this.itemcheck.label = campo.label;
           this.itemcheck.catalogo =  [];
           this.itemcheck.obligatorio = (campo.obligatorio === 1);
           this.camposServices.getCatalogoById(campo.idcamposproveedor).subscribe(
            res => {
              this.itemcheck.catalogo = res;
            },
            err => console.error(err)
            );
            this.campoCheck.push(this.itemcheck);
            // tslint:disable-next-line: no-unused-expression
            this[campo.label] = '';
            break;
          case this.button:
            this.campoboton.push(campo.label);
            this[campo.label] = ''; // crear la variable del campo 
            break;
         default:
            break;
        }
        this.indice++;
      }
    }


  showNotification(from: string, align: string) {

      const color = Math.floor((Math.random() * 5) + 1);

        this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span> Su registro está <b>Pendiente</b> - de aprobación.', '', {
           timeOut: 8000,
           closeButton: true,
           enableHtml: true,
           toastClass: 'alert alert-success alert-with-icon',
           positionClass: 'toast-' + from + '-' +  align
         });
        }

        openModalPoliticas() {
          // tslint:disable-next-line: prefer-const
          let data = null;
          this.dialogService.openModal('Politicas', this.constantes.politica, () => {
            // tslint:disable-next-line: no-unused-expression
            this.checkpoliticas = true;
          }, () => {
            this.checkpoliticas = false;
          });
        }


        saveInscripcion(userForm: NgForm) {
          if (userForm.valid) {
            if (this.checkpoliticas) {
              let indice = 0;
              this.proveedor[0].licitacion = this.licitacion;
              this.proveedor[0].razonsocial = this.razonsocial;
              this.proveedor[0].identicicacion = this.identificacion;
              if (this.proveedor[0].datos.length > 0) {
               // indice = this.proveedor[0].datos.length;
                this.proveedor[0].datos[indice] = {
                    dato: '',
                    idcamposproveedor: 0,
                    idinscripcion: 0
                  };
              }
                      // tslint:disable-next-line: forin
            for (const i of this.campoTexto) {
              this.proveedor[0].datos[indice].dato = i.nombre;
              this.proveedor[0].datos[indice].idcamposproveedor = i.id;
              indice++;
            }
            // tslint:disable-next-line: forin
            for (const i of this.campoTextField) {
              this.proveedor[0].datos[indice] = {
                dato: '',
                idcamposproveedor: 0,
                idinscripcion: 0
              };
              this.proveedor[0].datos[indice].dato = i.nombre;
              this.proveedor[0].datos[indice].idcamposproveedor = i.id;
              indice++;
            }

            // tslint:disable-next-line: forin
            /*for (const i in this.campoCheck) {
              this.proveedor.datos[indice] = i;
              this.indice++;
            }*/

            // tslint:disable-next-line: forin
            for (const i of this.campoCombo) {
              this.proveedor[0].datos[indice] = {
                dato: '',
                idcamposproveedor: 0,
                idinscripcion: 0
              };
              this.proveedor[0].datos[indice].dato = i.nombre;
              this.proveedor[0].datos[indice].idcamposproveedor = i.id;
              indice++;
            }
            // tslint:disable-next-line: no-unused-expression
            this.camposServices.saveProveedor(this.proveedor[0]).subscribe(
              res => {
                // tslint:disable-next-line: no-unused-expression
                this.router.navigateByUrl('/classification');
              },
              err => {
                 this.showNotification('Error', 'Ocurrio un error al guardar, por favor intente mas tarde');
              }
              );
            } else {
              this.dialogService.openModal('Alerta', this.constantes.mensaje, () => {
                // tslint:disable-next-line: no-unused-expression
                this.checkpoliticas = true;
              }, () => {
                this.checkpoliticas = false;
              });
            }
          } else {
            this.dialogService.openModalOk('Error', 'Por favor diligenciar todos los campos obligatorios', () => {
              // tslint:disable-next-line: no-unused-expression
            });
          }
        }


        selectChange( $event, id) {
          let tam = this.proveedor[0].datos.length;
          if (tam > 0) {
            this.proveedor[0].datos[tam - 1].dato = $event;
            this.proveedor[0].datos[tam - 1].idcamposproveedor = id;
          } else {
            this.proveedor[0].datos[0].dato = '';
            this.proveedor[0].datos[0].dato = $event;
            this.proveedor[0].datos[0].idcamposproveedor = id;
          }
        }

}
