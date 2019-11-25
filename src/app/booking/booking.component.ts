import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {HomeService} from '../home.service';
import {Home} from '../home';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  id: number;
  homeName: string;

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
