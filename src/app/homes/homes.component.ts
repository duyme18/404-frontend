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

  home: Home;

  // homeForm = new FormGroup({
  //   name: new FormControl(''),
  //   address: new FormControl(''),
  //   bedroomQuantity: new FormControl(''),
  //   bathroomQuantity: new FormControl(''),
  //   price: new FormControl(''),
  //   file: new FormControl(''),
  //   description: new FormControl('')
  // });

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

  getHomeId() {
    this.homeService.getHomeId(this.id).subscribe(result => {
      this.home = result;
      console.log(this.home);
    }, error => {
      console.log(error);
    });
  }
}
