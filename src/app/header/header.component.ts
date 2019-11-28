import {Component, OnInit} from '@angular/core';
import {SearchService} from '../search.service';
import {Home} from '../home';
import {TokenStorageService} from '../auth/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private roles: string[];
  private authority: string;
  private name: string;
  infor: any;
  homeList: Home[];
  filterHomeList: any[];

  searchText: string;

  constructor(private searchService: SearchService, private tokenStorage: TokenStorageService, private router: Router,
              private token: TokenStorageService) {
  }

  onSearchComplete() {
    console.log('Hello: -- ', this.searchText);
    this.searchService.send(this.searchText);
  }

  ngOnInit() {
    this.searchService.listen().subscribe(searchText => {
      this.filterHomeList = this.homeList.filter(home => home.name.includes(searchText));
    });
    this.infor = {
      token: this.token.getUsername(),
      username: this.token.getAuthorities()
    };
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
      this.roles.every(role => {
        if (role === 'ADMIN') {
          this.authority = 'admin';
          this.name = this.tokenStorage.getUsername();
          this.tokenStorage.getUsername();
          return false;
        } else if (role === 'PM') {
          this.authority = 'pm';
          return false;
        }
        this.authority = 'user';
        return true;
      });
    }
  }

  logoutUser() {
    this.token.signOut();
    window.location.reload();
  }

  detailUser() {
    console.log(this.infor);
  }
}
