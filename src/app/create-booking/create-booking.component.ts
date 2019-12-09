import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {TokenStorageService} from '../auth/token-storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Booking} from '../model/booking';
import {BookingService} from '../services/booking.service';
import {HomeService} from '../services/home.service';
import {Home} from '../model/home';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss']
})
export class CreateBookingComponent implements OnInit {
  private info: any;
  formBooking = new FormGroup({
    checkin: new FormControl(''),
    checkout: new FormControl('')
  });

  home: Home;

  constructor(private token: TokenStorageService,
              private route: ActivatedRoute,
              private router: Router,
              private homeService: HomeService,
              private bookingService: BookingService) {
  }

  ngOnInit() {
    this.info = {
      userId: this.token.getUserId(),
      username: this.token.getUsername(),
      token: this.token.getToken(),
      role: this.token.getAuthorities()
    };
    console.log(this.info);
  }

  createBooking() {
    const {checkin, checkout} = this.formBooking.value;
    if (checkin === '' || checkout === '') {
      return alert('Fill data fields !');
    }
    const booking: Booking = {
      checkin,
      checkout,
      user: {
        id: this.info.userId
      }
    };
    console.log(booking);
    this.bookingService.createBooking(booking).subscribe(
      result => {
        const id = +this.route.snapshot.paramMap.get('homeId');
        this.homeService.getHomeId(id).subscribe(next => {
          this.home = next;
          this.home.booking = result;
          this.home.statusHome.id = '1';
          this.homeService.updateHome(this.home, this.home.id).subscribe(result2 => {
            console.log('success');
          }, error => {
            console.log('fail to update home');
          });
        }, error => {
          console.log('fail to get home');
        });
        const form = new FormData();
        // closeButton.click();
        alert('Successful Booking');
      }, error => {
        console.log('fail to booking');
      });
  }
}
