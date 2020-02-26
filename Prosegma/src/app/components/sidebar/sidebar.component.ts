import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { type } from 'os';
import { CamposproveedorService } from '../../../services/camposproveedor.service';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Principal',  icon: 'design_app', class: '' },
    { path: '/icons', title: 'Cuenta',  icon: 'education_atom', class: '' },
    { path: '/maps', title: 'Administración cuenta',  icon: 'location_map-big', class: '' },
    { path: '/notifications', title: 'Inscripcion Proveedor',  icon: 'ui-1_bell-53', class: '' },

    { path: '/user-profile', title: 'Selección Proveedor',  icon: 'users_single-02', class: '' },
    { path: '/table-list', title: 'Evaluación Proveedor',  icon: 'design_bullet-list-67', class: '' },
    { path: '/typography', title: 'Entrada Materiales',  icon: 'text_caps-small', class: '' },
    { path: '/upgrade', title: 'Revisión Proveedores',  icon: 'objects_spaceship', class: '' }
   // { path: '/newuser', title: 'Nuevo Usuario',  icon: 'objects_spaceship', class: 'active active-pro' }
   // { path: '/resultSeleccion', title: 'Resultado Selección',  icon: 'objects_spaceship', class: 'active active-pro' }

  ];

  export const ROUTES_LOGOUT: RouteInfo[] = [
    { path: '/dashboard', title: 'Principal',  icon: 'design_app', class: '' }
  ];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  public randomNumber: number;
  exampleParent:string;


  constructor(private services: CamposproveedorService) { }

  ngOnInit() {

    this.menuItems = this.services.getMenuShow();
  }
  isMobileMenu() {
      if ( window.innerWidth > 991) {
          return false;
      }
      return true;
  };






}
