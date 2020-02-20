import { Component, OnInit } from '@angular/core';
import { type } from 'os';

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
    { path: '/upgrade', title: 'Revisión Proveedores',  icon: 'objects_spaceship', class: 'active active-pro' },
    { path: '/newuser', title: 'Nuevo Usuario',  icon: 'objects_spaceship', class: 'active active-pro' }

  ];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ( window.innerWidth > 991) {
          return false;
      }
      return true;
  };
}
