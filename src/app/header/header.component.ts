import {Component, OnInit} from '@angular/core';
import {SearchService} from '../search.service';
import {Home} from '../home';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  homeList: Home[];
  filterHomeList: any[];

  searchText: string;

  constructor(private searchService: SearchService) {
  }

  onSearchComplete() {
    console.log('Hello: -- ', this.searchText);
    this.searchService.send(this.searchText);
  }

  ngOnInit() {
    this.searchService.listen().subscribe(searchText => {
      this.filterHomeList = this.homeList.filter(home => home.name.includes(searchText));
    });
  }


}
