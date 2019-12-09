import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {HomeService} from '../services/home.service';
import {Home} from '../model/home';
import { TokenStorageService } from '../auth/token-storage.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  id: number;
  homeName: string;
  private info: any;

  home: Home;

  constructor(private activatedRoute: ActivatedRoute,
              private domSanitizer: DomSanitizer,
              private token: TokenStorageService,
              private homeService: HomeService) {
    this.activatedRoute.params.subscribe(params => {
      this.id = params.homeId;
      this.homeName = params.homeName;
    });
  }

  ngOnInit() {
    this.getHomeId();

    this.info = {
        token: this.token.getToken(),
        username: this.token.getUsername(),
        role: this.token.getAuthorities()
      };
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
