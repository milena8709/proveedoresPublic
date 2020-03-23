import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CamposproveedorService } from '../../../services/camposproveedor.service';


declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    perfil0: boolean;
    perfil1: boolean;
    perfil2: boolean;
    perfil3: boolean;
    perfil4: boolean;
    
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Principal',  icon: 'design_app', class: '', perfil0: true, perfil1: true, perfil2: true, perfil3: true, perfil4: true},
    { path: '/icons', title: 'Cuenta',  icon: 'education_atom', class: '', perfil0: true , perfil1: true, perfil2: true, perfil3: true, perfil4: true},
    // tslint:disable-next-line: max-line-length
    { path: '/maps', title: 'Administración cuenta',  icon: 'location_map-big', class: '', perfil0: false, perfil1: false, perfil2: false, perfil3: false, perfil4: true },
    // tslint:disable-next-line: max-line-length
    { path: '/notifications', title: 'Inscripcion Proveedor',  icon: 'ui-1_bell-53', class: '', perfil0: false, perfil1: true, perfil2: false, perfil3: false, perfil4: true  },
    // tslint:disable-next-line: max-line-length
    { path: '/user-profile', title: 'Selección Proveedor',  icon: 'users_single-02', class: '', perfil0: false, perfil1: false, perfil2: true, perfil3: false, perfil4: true   },
    // tslint:disable-next-line: max-line-length
    { path: '/table-list', title: 'Evaluación Proveedor',  icon: 'design_bullet-list-67', class: '', perfil0: false, perfil1: false, perfil2: true, perfil3: false, perfil4: true },
    // tslint:disable-next-line: max-line-length
    { path: '/typography', title: 'Entrada Materiales',  icon: 'text_caps-small', class: '',perfil0: false, perfil1: false, perfil2: false, perfil3: true, perfil4: true },
    // tslint:disable-next-line: max-line-length
    { path: '/upgrade', title: 'Revisión Proveedores',  icon: 'objects_spaceship', class: '', perfil0: false, perfil1: false, perfil2: true, perfil3: false, perfil4: true }
   // { path: '/newuser', title: 'Nuevo Usuario',  icon: 'objects_spaceship', class: 'active active-pro' }
   // { path: '/resultSeleccion', title: 'Resultado Selección',  icon: 'objects_spaceship', class: 'active active-pro' }
   ];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: RouteInfo[];


  constructor(private service: CamposproveedorService) { }


  public randomNumber: number;
  exampleParent: string;
  isloggin: boolean;
  menuShow: string;
  perfil: Array<{perfil: boolean}> = [];

  ngOnInit() {
    this.menuItems = (ROUTES.filter(menuItem => menuItem));
    if ( localStorage.getItem('perfil') ) {
      console.log('usuario logeado');
      if(localStorage.getItem('perfil') === '1' ) {
        for(let i = 0; i < this.menuItems.length; i++ ){
          this.perfil.push({perfil: this.menuItems[i].perfil1});
        }
      }
      if(localStorage.getItem('perfil') === '2' ) {
        for(let i = 0; i < this.menuItems.length; i++ ){
          this.perfil.push({perfil: this.menuItems[i].perfil2});
        }
      }
      if(localStorage.getItem('perfil') === '3' ) {
        for(let i = 0; i < this.menuItems.length; i++ ){
          this.perfil.push({perfil: this.menuItems[i].perfil3});
        }
      }
      if(localStorage.getItem('perfil') === '4' ) {
        for(let i = 0; i < this.menuItems.length; i++ ){
          this.perfil.push({perfil: this.menuItems[i].perfil4});
        }
      }
    } else{
      for(let i = 0; i < this.menuItems.length; i++ ){
        this.perfil.push({perfil: this.menuItems[i].perfil0});
      }
    }
    
  }
  


  isMobileMenu() {
      if ( window.innerWidth > 991) {
          return false;
      }
      return true;
  }



}
