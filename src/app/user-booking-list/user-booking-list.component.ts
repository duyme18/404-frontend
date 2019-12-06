import {Component, OnInit} from '@angular/core';
import {Booking} from '../services/booking';
import {TokenStorageService} from '../auth/token-storage.service';
import {BookingService} from '../services/booking.service';
import {UserService} from '../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../services/user';
import {Home} from '../services/home';
import {FormControl, FormGroup} from '@angular/forms';
import {HomeService} from '../services/home.service';

@Component({
  selector: 'app-user-booking-list',
  templateUrl: './user-booking-list.component.html',
  styleUrls: ['./user-booking-list.component.scss']
})
export class UserBookingListComponent implements OnInit {

  private homeId: string;
  booking: Booking;
  listBooking: Booking[];
  private info: any;
  home: Home;

  constructor(private token: TokenStorageService,
              private bookingService: BookingService,
              private route: ActivatedRoute,
              private router: Router,
              private homeService: HomeService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.getBookingList();
    // this.getListBooking();

    const id = +this.route.snapshot.paramMap.get('id');
    this.bookingService.findBookingById(id).subscribe(next => {
      this.booking = next;
    }, error => {
      console.log(error);
    });

    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      role: this.token.getAuthorities()
    };
  }

  getAllHomeByBookingId(id: number) {
    this.homeService.getAllHomeByBookingId(id).subscribe(result => {
      this.home = result;
      this.router.navigateByUrl('/home/' + this.home[0].id + '/' + this.home[0].name).then( success => {
        console.log('success to find home by booking');
      });
    }, error => {
      console.log('fail to get home');
    });
  }

  getBookingList() {
    const id = +this.route.snapshot.paramMap.get('userId');
    this.userService.getBookingByUser(id).subscribe(
      result => {
        this.listBooking = result;
        console.log(this.listBooking);
      }, error => {
        alert('Error get booking');
      }
    );
  }

  deleteBooking(i) {
    const booking = this.listBooking[i];
    this.homeService.getAllHomeByBookingId(booking.id).subscribe(next => {
      this.home = next;
      console.log(this.home[0]);
      this.home[0].statusHome.id = '2';
      this.home[0].booking = null;
      this.homeService.updateHome(this.home[0], this.home[0].id).subscribe(result2 => {
        console.log('success');
        this.bookingService.deleteBookingById(booking.id).subscribe(() => {
          console.log('success to delete booking');
          this.getBookingList();
        });
      }, error => {
        this.bookingService.deleteBookingById(booking.id).subscribe(() => {
          console.log('success to delete booking');
        });
        console.log('fail to update home');
      });
    });
  }
}
