import {Component, OnInit} from '@angular/core';
import {Home} from '../home';
import {CategoryHome} from '../category-home';
import {CategoryRoom} from '../category-room';
import {StatusHome} from '../status-home';
import {FormControl, FormGroup} from '@angular/forms';
import {HomeService} from '../home.service';
import {SearchService} from '../search.service';
import {SearchHomeByAddress} from './search-home-by-address';

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

  searchAddress = '';

  constructor(private homeService: HomeService, private searchService: SearchService) {
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

  searchHomeByAddress() {
    const addressForm: SearchHomeByAddress = {
      address: this.searchAddress
    };
    this.homeService.searchHomeByAddress(addressForm).subscribe(result => {
      this.homeList = result;
    });
  }

  private getHomeList() {
    this.homeService.getList().subscribe(result => {
      this.homeList = result;
    });
  }

}
