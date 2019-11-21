import {Component} from '@angular/core';
import {SearchService} from './search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  // latitude: 51.678418;
  // longitude: 7.809007;
  // locationChosen: boolean;
  //
  // onChoseLocation(event) {
  //   console.log(event);
  //   // this.latitude = event.coords.lat;
  //   // this.longitude = event.coords.lng;
  //   // this.locationChosen = true;
  // }

  constructor() {

  }
}
