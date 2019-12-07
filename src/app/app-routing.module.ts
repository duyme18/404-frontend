import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeListComponent} from './home-management/home-list/home-list.component';
import {AddHomeComponent} from './home-management/add-home/add-home.component';
import {EditHomeComponent} from './home-management/edit-home/edit-home.component';
import {RegisterComponent} from './register/register.component';
import {SignupComponent} from './login/signup.component';
import {ChangePassComponent} from './change-pass/change-pass.component';
import {HomeDetailComponent} from './home-management/home-detail/home-detail.component';
import {BookingComponent} from './booking/booking.component';
import {NotActivateTeam} from './deactivate/not-activate-team';
import {IsAdmin} from './deactivate/is-admin';
import {CreateBookingComponent} from './create-booking/create-booking.component';
import {UserBookingListComponent} from './user-booking-list/user-booking-list.component';
import {CreateHomeComponent} from './create-home/create-home.component';
import {CategoryHomeComponent} from './category/category-home/category-home.component';
import {CategoryRoomComponent} from './category/category-room/category-room.component';
import {StatusHomeComponent} from './status-home/status-home.component';
import {UserManageComponent} from './user-manage/user-manage.component';

const routes: Routes = [
  {
    path: 'home-list', component: HomeListComponent
  },
  {
    path: 'add-home', component: AddHomeComponent, canActivate: [IsAdmin]
  },
  {
    path: 'category-home', component: CategoryHomeComponent, canActivate: [IsAdmin]
  },
  {
    path: 'category-room', component: CategoryRoomComponent, canActivate: [IsAdmin]
  },
  {
    path: 'status-home', component: StatusHomeComponent, canActivate: [IsAdmin]
  },
  {
    path: 'list-user', component: UserManageComponent, canActivate: [IsAdmin]
  },
  {
    path: 'create-booking/:homeId', component: CreateBookingComponent
  },
  {
    path: 'user-booking-list', component: UserBookingListComponent
  },
  {
    path: 'user-booking-list/:userId', component: UserBookingListComponent
  },
  {
    path: 'home/:homeId/:name', component: HomeDetailComponent
  },
  {
    path: 'home-edit/:homeId', component: EditHomeComponent, canActivate: [IsAdmin]
  },
  {
    path: 'home-booking/:homeId', component: BookingComponent
  },
  {
    path: 'create-home', component: CreateHomeComponent
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NotActivateTeam]
  },
  {
    path: 'login',
    component: SignupComponent,
    canActivate: [NotActivateTeam]
  },
  {
    path: 'change-password',
    component: ChangePassComponent,
  }, {
    path: '',
    component: HomeListComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
