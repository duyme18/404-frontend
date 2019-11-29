import {Component, OnInit} from '@angular/core';
import {Home} from '../services/home';
import {CategoryHome} from '../services/category-home';
import {CategoryRoom} from '../services/category-room';
import {StatusHome} from '../services/status-home';
import {FormControl, FormGroup} from '@angular/forms';
import {HomeService} from '../services/home.service';
import {SearchService} from '../services/search.service';
import {SearchHomeByAddress} from './search-home-by-address';
import {TokenStorageService} from '../auth/token-storage.service';

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
  private info: any;

  constructor(private tokenStorage: TokenStorageService,
              private homeService: HomeService, private searchService: SearchService) {
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

    this.info = {
      token: this.tokenStorage.getToken(),
      username: this.tokenStorage.getUsername(),
      id: this.tokenStorage.getUserId()
    };

    console.log(this.info);
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
