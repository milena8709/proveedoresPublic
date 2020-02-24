import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SeleccionProveedor } from '../models/seleccionProveedor';
import { CamposproveedorService } from '../../services/camposproveedor.service';

@Component({
  selector: 'app-criterion',
  templateUrl: './criterion.component.html',
  styleUrls: ['./criterion.component.scss']
})
export class CriterionComponent implements OnInit {
  proveedores: any;
  value: SeleccionProveedor;
  criterios: any = [];

  constructor(private route: ActivatedRoute, private service: CamposproveedorService, private router: Router) { }

  ngOnInit() {
    this.proveedores = this.service.getProveedores();
    this.service.getCriterios().subscribe(
      res => {
        this.criterios = res;
      },
      err => console.error(err)
      );


  }


siguiente() {
  this.service.setProveedores(this.proveedores);
  this.router.navigate(['/AhpComponent']);

}

}
