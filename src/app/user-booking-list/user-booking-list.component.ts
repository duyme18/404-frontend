import {Component, OnInit} from '@angular/core';
import {Booking} from '../services/booking';
import {TokenStorageService} from '../auth/token-storage.service';
import {BookingService} from '../services/booking.service';
import {UserService} from '../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../services/user';
import {Home} from '../services/home';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-user-booking-list',
  templateUrl: './user-booking-list.component.html',
  styleUrls: ['./user-booking-list.component.scss']
})
export class UserBookingListComponent implements OnInit {

  bookingId: string;
  booking: Booking;
  listBooking: Booking[];
  private info: any;

  constructor(private token: TokenStorageService,
              private bookingService: BookingService,
              private route: ActivatedRoute,
              private router: Router,
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

  getBookingList() {
    this.userService.getBookingByUser(this.token.getUserId()).subscribe(
      result => {
        this.listBooking = result;
        console.log(this.listBooking);
      }, error => {
        alert('Error get booking');
      }
    );
  }
  private getListBooking() {
    this.bookingService.getBookingList().subscribe(result => {
      this.listBooking = result;
    });
  }

  deleteBooking(i) {
    const booking = this.listBooking[i];
    this.bookingService.deleteBookingById(booking.id).subscribe(() => {
      this.listBooking = this.listBooking.filter(t => t.id !== booking.id);
    });
  }
}
