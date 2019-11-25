import {Component, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {HomeService} from '../home.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryHome} from '../category-home';
import {CategoryRoom} from '../category-room';
import {StatusHome} from '../status-home';
import {Home} from '../home';
import {TokenStorageService} from '../auth/token-storage.service';

@Component({
  selector: 'app-home-detail',
  templateUrl: './home-detail.component.html',
  styleUrls: ['./home-detail.component.scss']
})
export class HomeDetailComponent implements OnInit {

  id: number;
  homeName: string;
  categoryHome: CategoryHome;
  categoryRoom: CategoryRoom;
  statusHome: StatusHome;
  latitude: 105.77876;
  longitude: 105.77876;
  locationChosen: boolean;

  home: Home;

  private info: any;

  constructor(private activatedRoute: ActivatedRoute,
              private domSanitizer: DomSanitizer,
              private homeService: HomeService,
              private router: Router,
              private token: TokenStorageService) {
    this.activatedRoute.params.subscribe(params => {
      this.id = params.homeId;
      this.homeName = params.homeName;
    });
  }

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      role: this.token.getAuthorities()
    };

    console.log(this.info);

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

  bookingButton() {
    if (this.info.token != null) {
      return this.router.navigateByUrl('/home-booking/' + this.id);
    } else {
      return this.router.navigateByUrl('/login');

    }
  }
}
