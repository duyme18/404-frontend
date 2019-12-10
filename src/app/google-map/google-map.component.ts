import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit {

  lat: number;
  lng: number;
  zoom: number;

  constructor() {
  }

  ngOnInit() {
    this.lat = 16.0471659;
    this.lng = 108.1891961;
    this.zoom = 15;
  }

  mapClick(event) {
    // console.log(event);
  }

  mapDoubleClick(event) {
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
  }
}
