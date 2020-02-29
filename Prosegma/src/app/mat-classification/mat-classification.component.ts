import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../models/Transaction';
import { Materials } from '../models/materials';
import { NgForm } from '@angular/forms';
import { MaterialsData } from '../models/materialsData';
import { Product } from '../models/products';

@Component({
  selector: 'app-mat-classification',
  templateUrl: './mat-classification.component.html',
  styleUrls: ['./mat-classification.component.scss']
})
export class MatClassificationComponent implements OnInit {

  evaluaciones: any [] = [];

  idProvider: string;
  nameProvider: string;
  segmento: string;
  familia: string;
  clase: string;
  producto: string;

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

  materiales: MaterialsData[] = [];
  cantidades: MaterialsData[] = [];
  units: MaterialsData[] = [];

  safeMaterials: MaterialsData[] = [];

  unidades: any[] = [];
  materials: MaterialsData [] = [];

  product: Product [] = [];

  constructor(private transactionService: TransactionService) { }

  ngOnInit() {
    this.transactionService.getMaterials().subscribe( (resp) => {
      this.evaluaciones = resp;
    });
  }

  selectedProvider( id: string) {
    if ( id != null && id !== '') {
      this.idProvider = id;
      this.transaccion.idproveedor = id;
    }
    console.log('Este es el usuario seleccionado desde el padre ' + id );
  }

  takeNameProvider( name: string ) {
    if ( name != null && name !== '') {
      this.nameProvider = name;
      console.log('Nombre proveedor :: ' + this.nameProvider);
    }
  }

  searchProducto(form: NgForm) {
    console.log(form.form.value);
    this.transactionService.getEvaluationByDetail(form.form.value).subscribe( (resp) => {
      this.evaluaciones = resp;
    });
  }

  createTransaction(form: NgForm) {
    console.log('Materiales !! '  + JSON.stringify(this.materiales));
    console.log('units !! '  + JSON.stringify(this.units));
    console.log('cantidades !! '  + JSON.stringify(this.cantidades));
    // console.log('1221323  =  '  + JSON.stringify(form.form.value));
    if (this.transaccion.description != null && this.transaccion.description !== ''
      && this.transaccion.fechalimite != null && this.transaccion.idorden != null
      && this.transaccion.idorden !== '') {
          // this.changeCard();

        for (let i = 0; i < this.materiales.length; i++ ) {
          const data = new MaterialsData();
          console.log( ' this.materiales.length : ' + this.materiales.length);
          data.idproducto = this.materiales[i].idproducto;
          console.log( ' data.idproducto : ' + data.idproducto);
          const indexMaterials = this.materiales.findIndex(x => x.idproducto === data.idproducto);
          const indexCantidades = this.cantidades.findIndex(x => x.idproducto === data.idproducto);
          const indexunits = this.units.findIndex(x => x.idproducto === data.idproducto);
          console.log( ' indexMaterials : ' + indexMaterials + ' indexCantidades ' + indexCantidades + ' indexunits ' + indexunits );
          if (indexMaterials > -1 && indexCantidades > -1 && indexunits > -1) {
            data.unidades = this.units[indexunits].unidades;
            data.cantidad_esperada = this.cantidades[indexCantidades].cantidad_esperada;
            this.safeMaterials.push(data);
          }
        }
        this.transaccion.materiales = this.safeMaterials;
        console.log(JSON.stringify(this.transaccion));
        this.transactionService.createTransaction(this.transaccion).subscribe(
          res => {
            // tslint:disable-next-line: no-unused-expression
            console.log('Se crea transaccion..... ');
          },
          err => console.error(err)
          );

    } else {
      console.log('no se puede registrar la evaluacion porque no ha seleccioando todos los campos');
    }

    console.log('SAFEMATERIALS :: ' + JSON.stringify(this.safeMaterials));

  }

  agregarDato(dato: string, idProducto: string) {
    console.log('dato   ...   ' + dato);
    const data = new MaterialsData();
    data.idproducto = idProducto;
    const index = this.units.findIndex(x => x.idproducto === idProducto);
    console.log('index units :: ' + index);
    if ( dato !== null && dato !== '') {
      if (index > -1 ) {
        this.units[index].unidades = dato;
      } else {
        data.unidades = dato;
        this.units.push(data);
      }
    }
  }

  agregarUnidad(dato: string, idProducto: string){
    console.log('Cantidades :: ' + dato + ' - ' + idProducto);
    const data = new MaterialsData();
    data.idproducto = idProducto;
    const index = this.cantidades.findIndex(x => x.idproducto === idProducto);
    console.log('index cantidades :: ' + index);
    if (index > -1 ) {
      this.cantidades[index].cantidad_esperada = dato;
    } else {
      data.cantidad_esperada = dato;
      this.cantidades.push(data);
    }
  }

  selectMaterial(idProduct: string, input: boolean) {
    console.log('codigo producto ' + idProduct);
    const data = new MaterialsData();
    data.idproducto = idProduct;
    if (input === true) {
      this.materiales.push(data);
    } else {
      const index = this.materiales.findIndex(x => x.idproducto === idProduct);
      console.log('index material : ' + index);
      this.materiales.splice(index,1);
    }
  }

}
