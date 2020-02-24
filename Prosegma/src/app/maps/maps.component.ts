import { Component, OnInit, HostBinding } from '@angular/core';
import { NgForm } from '@angular/forms';

declare const google: any;

interface Marker {
lat: number;
lng: number;
label?: string;
draggable?: boolean;
}
@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
    @HostBinding('class') classes = 'row';

  constructor() { }

  ngOnInit() {}



}
