import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBookingListComponent } from './user-booking-list.component';

describe('UserBookingListComponent', () => {
  let component: UserBookingListComponent;
  let fixture: ComponentFixture<UserBookingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserBookingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBookingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
