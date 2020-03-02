import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import { MaterialsData } from '../models/materialsData';
import { Transaction } from '../models/Transaction';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gestionar-transaccion',
  templateUrl: './gestionar-transaccion.component.html',
  styleUrls: ['./gestionar-transaccion.component.scss']
})
export class GestionarTransaccionComponent implements OnInit {

  transaction: any [] = [
    {
      descripcion: 'vacio',
      fecha_limite_entrega: '0000-00-00',
      id_orden_compra: 'vacio'
    }
  ];

  transaccion: Transaction = {
    description: null,
    fechalimite: null,
    idorden: null,
    idproveedor: null,
    rutaordencompra: null,
    estado: null,
    observacion: null,
    materiales: [{}]
  };

  cantidadRecibida: MaterialsData[] = [];
  cumplecondiciones: MaterialsData[] = [];
  observaciones: MaterialsData[] = [];

  safeMaterials: MaterialsData[] = [];

  estadoTransaccion: string;
  observacionesGenerales: string;

  constructor(private toastr: ToastrService, private transactionService: TransactionService, private router: ActivatedRoute, private route: Router) {
    this.router.params.subscribe( params => {
      this.getTransaction(params.id);
    });
  }

  ngOnInit() {
  }

  getTransaction(id: string ) {
    this.transactionService.getTransactionToUpdate(id).subscribe( (resp) => {
      this.transaction = resp;
      console.log('transaction :: ' + JSON.stringify(this.transaction));
    });
  }

  goBack() {
    this.route.navigate(['/transaction']);
  }

  agregarCantidad(dato: string, idProducto: string){
    console.log('Cantidades :: ' + dato);
    const data = new MaterialsData();
    data.idproducto = idProducto;
    const index = this.cantidadRecibida.findIndex(x => x.idproducto === idProducto);
    console.log('index cantidades :: ' + index);
    if (index > -1 ) {
      this.cantidadRecibida[index].cantidad_recibida = dato;
      console.log('insdffffff dfdes :: ');
    } else {
      data.cantidad_recibida = dato;
      this.cantidadRecibida.push(data);
    }
    console.log('Cantidad Recibida ::: ' + JSON.stringify(this.cantidadRecibida));
  }

  selectQuality(idProduct: string, input: boolean) {
    console.log('codigo producto ' + idProduct);
    const data = new MaterialsData();
    data.idproducto = idProduct;
    if (input === true) {
      data.aprobacion_calidad = 'true';
      this.cumplecondiciones.push(data);
    } else {
      data.aprobacion_calidad = 'false';
      const index = this.cumplecondiciones.findIndex(x => x.idproducto === idProduct);
      console.log('index material : ' + index);
      this.cumplecondiciones.splice(index, 1);
    }
  }

  takeObservation(dato: string, idProduct: string) {
    console.log('observacion :: ' + dato + ' - ' + idProduct);
    const data = new MaterialsData();
    data.idproducto = idProduct;
    // data.observacion = dato;
    const index = this.observaciones.findIndex(x => x.idproducto === idProduct);
    console.log('index cantidades :: ' + index);
    if (index > -1 ) {
      this.observaciones[index].observacion = dato;
    } else {
      data.observacion = dato;
      this.observaciones.push(data);
    }
  }

  takeGenenralObservation(dato: string) {
    console.log('observacion :: ' + dato);
    this.transaccion.observacion = dato;
  }

  agregarEstado(estado: string) {
      console.log(estado);
      this.estadoTransaccion = estado;
  }

  createTransaction(form: NgForm) {

    console.log('cantidadRecibida !! '  + JSON.stringify(this.cantidadRecibida));
    console.log('cumplecondiciones !! '  + JSON.stringify(this.cumplecondiciones));
    console.log('observaciones !! '  + JSON.stringify(this.observaciones));
    // console.log('1221323  =  '  + JSON.stringify(form.form.value));
    /*if (this.transaccion.description != null && this.transaccion.description !== ''
      && this.transaccion.fechalimite != null && this.transaccion.idorden != null
      && this.transaccion.idorden !== '') {*/
          // this.changeCard();

        // tslint:disable-next-line: max-line-length
        if ((this.transaccion.estado === 'finalizada' || this.transaccion.estado === 'finalizada con observaciones') && (this.observaciones.length !== this.transaction.length)) {
          return this.showNotificationObservaciones('top', 'center');
         }
        for (let i = 0; i < this.transaction.length; i++ ) {
          const data = new MaterialsData();
          console.log( ' this.transaction.length : ' + this.transaction.length);
          data.idproducto = this.transaction[i].id_producto;
          console.log( ' data.idproducto : ' + data.idproducto);
          let indexCantidad = this.cantidadRecibida.findIndex(x => x.idproducto === data.idproducto);
          let indexCalidad = this.cumplecondiciones.findIndex(x => x.idproducto === data.idproducto);
          let indexObservaciones = this.observaciones.findIndex(x => x.idproducto === data.idproducto);
          if (indexCantidad === -1) {
            console.log('entra a index cantidad');
            data.cantidad_recibida = '0';
            this.cantidadRecibida.push(data);
          }
          if (indexCalidad === -1) {
            data.aprobacion_calidad = 'false';
            this.cumplecondiciones.push(data);
          }
          if (indexObservaciones === -1) {
            data.observacion = '';
            this.observaciones.push(data);
          }
          indexCantidad = this.cantidadRecibida.findIndex(x => x.idproducto === data.idproducto);
          indexCalidad = this.cumplecondiciones.findIndex(x => x.idproducto === data.idproducto);
          indexObservaciones = this.observaciones.findIndex(x => x.idproducto === data.idproducto);
          // tslint:disable-next-line: max-line-length
          console.log( ' indexCantidad : ' + indexCantidad + ' indexCalidad ' + indexCalidad + ' indexObservaciones ' + indexObservaciones );
          if (indexCantidad > -1 && indexCalidad > -1 && indexObservaciones > -1) {
            data.cantidad_recibida = this.cantidadRecibida[indexCantidad].cantidad_recibida;
            console.log('data.cantidad_recibida = ' + data.cantidad_recibida);
            console.log('this.cantidadRecibida[indexCantidad].cantidad_recibida = '+ this.cantidadRecibida[indexCantidad].cantidad_recibida);
            data.aprobacion_calidad = this.cumplecondiciones[indexCalidad].aprobacion_calidad;
            data.observacion = this.observaciones[indexObservaciones].observacion;
            console.log('observaciones :: ' + this.observaciones[indexObservaciones].observacion);
            this.safeMaterials.push(data);
          }
        }
        this.transaccion.materiales = this.safeMaterials;
        if (this.estadoTransaccion !== null && this.estadoTransaccion !== '' && this.estadoTransaccion !== undefined){
          this.transaccion.estado = this.estadoTransaccion;
        } else {
          this.transaccion.estado = 'finalizada';
        }
        if (this.transaccion.observacion === null || this.transaccion.observacion === '' || this.transaccion.observacion === undefined) {
          this.transaccion.observacion = '';
        }


        this.transaccion.idTransaction = this.transaction[0].id;
        console.log(JSON.stringify(this.transaccion));
        this.transactionService.updateTransaction(this.transaccion).subscribe(
          res => {
            // tslint:disable-next-line: no-unused-expression
            console.log('Se actualiza transaccion..... ');
          },
          err => console.error(err)
          );

    /*} else {
      console.log('no se puede registrar la evaluacion porque no ha seleccioando todos los campos');
    }*/

    // 
    console.log('SAFEMATERIALS :: ' + JSON.stringify(this.safeMaterials));
    this.goBack();
  }

  showNotificationObservaciones(from: string, align: string) {

    const color = Math.floor((Math.random() * 5) + 1);

      this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span>Ingrese las observaciones que no cumplieron con la cantidad o la calidad esperada.', '', {
         timeOut: 2000,
         closeButton: true,
         enableHtml: true,
         toastClass: 'alert alert-error alert-with-icon',
         positionClass: 'toast-' + from + '-' +  align
       });
    }


}
