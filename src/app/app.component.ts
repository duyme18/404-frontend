import {Component} from '@angular/core';
import {SearchService} from './services/search.service';
import * as firebase from 'firebase';
import {environment} from '../environments/environment.prod';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';

  public appFirebase = firebase.initializeApp(environment.firebase);


  constructor() {

  }
}
