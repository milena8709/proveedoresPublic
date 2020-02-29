import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import { MaterialsData } from '../models/materialsData';
import { Transaction } from '../models/Transaction';

@Component({
  selector: 'app-gestionar-transaccion',
  templateUrl: './gestionar-transaccion.component.html',
  styleUrls: ['./gestionar-transaccion.component.scss']
})
export class GestionarTransaccionComponent implements OnInit {

  transaction: any [] = [
    {
      descripcion: 'vacio',
      fecha_limite_entrega: 'vacio',
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

  constructor(private transactionService: TransactionService, private router: ActivatedRoute, private route: Router) {
    this.router.params.subscribe( params => {
      this.getTransaction(params.id);
    });
  }

  ngOnInit() {
  }

  getTransaction(id: string ) {
    this.transactionService.getTransactionToUpdate(id).subscribe( (resp) => {
      this.transaction = resp;
      console.log('transaction :: ' + this.transaction);
    });
  }

  goBack() {
    this.route.navigate(['/transaction']);
  }

  agregarCantidad(dato: string, idProducto: string){
    console.log('Cantidades :: ' + dato + ' - ' + idProducto);
    const data = new MaterialsData();
    data.idproducto = idProducto;
    const index = this.cantidadRecibida.findIndex(x => x.idproducto === idProducto);
    console.log('index cantidades :: ' + index);
    if (index > -1 ) {
      this.cantidadRecibida[index].cantidad_esperada = dato;
    } else {
      data.cantidad_esperada = dato;
      this.cantidadRecibida.push(data);
    }
  }

  selectQuality(idProduct: string, input: boolean) {
    console.log('codigo producto ' + idProduct);
    const data = new MaterialsData();
    data.idproducto = idProduct;
    if (input === true) {
      this.cumplecondiciones.push(data);
    } else {
      const index = this.cumplecondiciones.findIndex(x => x.idproducto === idProduct);
      console.log('index material : ' + index);
      this.cumplecondiciones.splice(index, 1);
    }
  }

}
