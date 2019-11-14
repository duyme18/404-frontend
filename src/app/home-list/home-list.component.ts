import {Component, OnInit} from '@angular/core';
import {Home} from '../home';
import {CategoryHome} from '../category-home';
import {CategoryRoom} from '../category-room';
import {StatusHome} from '../status-home';
import {FormControl, FormGroup} from '@angular/forms';
import {HomeService} from '../home.service';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.scss']
})
export class HomeListComponent implements OnInit {
  homeList: Home[];
  categoryHomeList: CategoryHome[];
  categoryRoomList: CategoryRoom[];
  statusHomeList: StatusHome[];

  homeForm = new FormGroup({
    name: new FormControl(''),
    address: new FormControl(''),
    bedroomQuantity: new FormControl(''),
    bathroomQuantity: new FormControl(''),
    price: new FormControl(''),
    file: new FormControl(''),
    description: new FormControl('')
  });

  filterHomeList: any[];

  constructor(private homeService: HomeService) {
  }

  ngOnInit() {
    this.getHomeList();
    this.homeService.getCategoryHomeList().subscribe(result => {
      this.categoryHomeList = this.categoryHomeList;
    });
    this.homeService.getCategoryRoomList().subscribe(result => {
      this.categoryRoomList = this.categoryRoomList;
    });
    this.homeService.getStatusHomeList().subscribe(result => {
      this.statusHomeList = this.statusHomeList;
    });
  }

  private getHomeList() {
    this.homeService.getList().subscribe(result => {
      this.homeList = result;
    });
  }

}
