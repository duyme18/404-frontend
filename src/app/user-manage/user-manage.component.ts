import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from '../services/user';
import {TokenStorageService} from '../auth/token-storage.service';
import {BookingService} from '../services/booking.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HomeService} from '../services/home.service';
import {Booking} from '../services/booking';
import {SearchUserByName} from './search-user-by-name';

@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.scss']
})
export class UserManageComponent implements OnInit {
  searchUser = '';
  userList: User[] = [];
  booking: Booking;
  userId: string;
  name: '';

  constructor(private token: TokenStorageService,
              private bookingService: BookingService,
              private route: ActivatedRoute,
              private router: Router,
              private homeService: HomeService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.getListUser();
  }

  searchUserByName() {
    const usernameForm: SearchUserByName = {
      name: this.searchUser
    };
    this.userService.searchUserByName(usernameForm).subscribe(result => {
      this.userList = result;
    });
  }

  getListUser() {
    this.userService.getListUser().subscribe(result => {
      this.userList = result;
    }, error => {
      console.log(error);
    });
  }

  getUserId(id: string) {
    this.userId = id;
  }
}
