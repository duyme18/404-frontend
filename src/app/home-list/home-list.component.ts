import {Component, OnInit} from '@angular/core';
import {Home} from '../services/home';
import {CategoryHome} from '../services/category-home';
import {CategoryRoom} from '../services/category-room';
import {StatusHome} from '../services/status-home';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HomeService} from '../services/home.service';
import {SearchHomeByAddress} from './search-home-by-address';
import {TokenStorageService} from '../auth/token-storage.service';
import {SearchAllService} from '../services/search-all.service';

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

  searchAllForm: FormGroup;

  constructor(private tokenStorage: TokenStorageService,
              private homeService: HomeService,
              private searchAllService: SearchAllService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.searchAllForm = this.fb.group({
      searchBedroomQuantity: [''],
      searchBathroomQuantity: [''],
      searchAddress: [''],
      searchPriceMin: [''],
      searchPriceMax: [''],
    });

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

  searchAll() {
    const {value} = this.searchAllForm;
    console.log(value);
    if (value.searchBedroomQuantity === '') {
      value.searchBedroomQuantity = -1;
    }
    if (value.searchBathroomQuantity === '') {
      value.searchBathroomQuantity = -1;
    }
    if (value.searchAddress === '') {
      value.searchAddress = -1;
    }
    if (value.searchPriceMin === '') {
      value.searchPriceMin = 1;
    }
    if (value.searchPriceMax === '') {
      value.searchPriceMax = 100000;
    }
    this.searchAllService.searchALl(value.searchBedroomQuantity,
      value.searchBathroomQuantity,
      value.searchAddress,
      value.searchPriceMin,
      value.searchPriceMax).subscribe(result => {
      this.homeList = result;
      console.log(value);
    }, error => {
      console.log(error);
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
