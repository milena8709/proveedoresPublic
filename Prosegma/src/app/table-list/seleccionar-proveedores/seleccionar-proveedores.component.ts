import { Component, OnInit, Input, Output } from '@angular/core';
import { EvaluationService } from '../../../services/evaluation.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { Proveedor } from '../../models/proveedor';
import { Provider } from '../../models/provider';
import { ProvidersService } from '../../../services/proveedores.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-seleccionar-proveedores',
  templateUrl: './seleccionar-proveedores.component.html',
  styleUrls: ['./seleccionar-proveedores.component.scss']
})
export class SeleccionarProveedoresComponent implements OnInit {

  // @Input() providerSearch: any[] = [];

  @Output() sendProvider = new EventEmitter();
  @Output() sendSocialReason = new EventEmitter();

  usuario: Object = {
    id: null,
    name: null
  };

  request: Proveedor = {
    idProveedor: null,
    socialReason: null
  };

   proveedores: Proveedor[] = [];
   providers: Provider [] = [];

   idProviderSelected: string;
   name: string;

   count = 0;
   checked = false;
   
  constructor(private toastr: ToastrService,private evaluationService: EvaluationService, private providersService: ProvidersService, private router: Router) {
  }

  ngOnInit() {
      const data = new Provider();
      this.evaluationService.getProveedor().subscribe( (resp) => {
        this.providers = resp;
        console.log('Estos son los proveedores' + this.proveedores[0]);
      });
  }

  selectProvider(id: string, input: boolean) {
    if ( input ) {
      this.idProviderSelected = id;
      this.count += 1;
      if ( this.count === 2) {
        this.checked = false;
        this.showNotification('top', 'center');
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/table-list']);
      });
      }
    } else {
      this.idProviderSelected = '';
      this.name = '';
      this.count = 0;
    }
    console.log('count = ' + this.count);
    this.callParentEvent();

  }

  showNotification(from: string, align: string) {

    const color = Math.floor((Math.random() * 5) + 1);

      this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span> No puede seleccionar mas de dos <b>Proveedores</b>.', '', {
         timeOut: 2000,
         closeButton: true,
         enableHtml: true,
         toastClass: 'alert alert-error alert-with-icon',
         positionClass: 'toast-' + from + '-' +  align
       });
    }
  selectedName(social_reason: string, input: boolean) {
    if ( input ) {
      this.name = social_reason;
    } else {
      this.idProviderSelected = '';
      this.name = '';
    }
    console.log('this.name ' + this.name);
    this.callParentEvenSocial();
  }

  callParentEvent() {
    this.sendProvider.emit(this.idProviderSelected);
  }

  callParentEvenSocial() {
    this.sendSocialReason.emit(this.name);
  }

  buscar(forma: NgForm) {
    this.request.idProveedor = forma.form.value.id;
    this.request.socialReason = forma.form.value.proveedor;

    this.providersService.getProveedorById(this.request).subscribe( (resp) => {
      // console.log('Form resasd : ' + JSON.parse(resp));
      this.providers = resp;
    }, ( errorServicio ) => {
      this.providers = [];
    });
  }

}
