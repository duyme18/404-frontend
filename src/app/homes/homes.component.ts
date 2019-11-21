import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {Home} from '../home';
import {CategoryHome} from '../category-home';
import {CategoryRoom} from '../category-room';
import {StatusHome} from '../status-home';
import {FormControl, FormGroup} from '@angular/forms';
import {HomeService} from '../home.service';

@Component({
  selector: 'app-homes',
  templateUrl: './homes.component.html',
  styleUrls: ['./homes.component.scss']
})
export class HomesComponent implements OnInit {
  id: number;
  homeName: string;
  categoryHome: CategoryHome;
  categoryRoom: CategoryRoom;
  statusHome: StatusHome;
  latitude: 105.77876;
  longitude: 105.77876;
  locationChosen: false;

  home: Home;


  constructor(private activatedRoute: ActivatedRoute,
              private domSanitizer: DomSanitizer,
              private homeService: HomeService) {
    this.activatedRoute.params.subscribe(params => {
      this.id = params.homeId;
      this.homeName = params.homeName;
    });
  }

  ngOnInit() {
    this.getHomeId();
    this.homeService.getCategoryHomeList().subscribe(result => {
      this.categoryHome = this.categoryHome;
    });
    this.homeService.getCategoryRoomList().subscribe(result => {
      this.categoryRoom = this.categoryRoom;
    });
    this.homeService.getStatusHomeList().subscribe(result => {
      this.statusHome = this.statusHome;
    });
  }


  onChoseLocation(event) {
    console.log(event);
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
    this.locationChosen = true;
  }
  getHomeId() {
    this.homeService.getHomeId(this.id).subscribe(result => {
      this.home = result;
      console.log(this.home);
    }, error => {
      console.log(error);
    });
  }
}
