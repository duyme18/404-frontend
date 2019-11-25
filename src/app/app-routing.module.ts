import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeListComponent} from './home-list/home-list.component';
import {AddHomeComponent} from './add-home/add-home.component';
import {EditHomeComponent} from './edit-home/edit-home.component';
import {RegisterComponent} from './register/register.component';
import {SignupComponent} from './signup/signup.component';
import {HomeDetailComponent} from './home-detail/home-detail.component';
import {BookingComponent} from './booking/booking.component';
import {NotActivateTeam} from './deactivate/not-activate-team';
import {IsAdmin} from './deactivate/is-admin';


const routes: Routes = [
  {
    path: 'home-list', component: HomeListComponent
  },
  {
    path: 'add-home', component: AddHomeComponent, canActivate: [IsAdmin]
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
    path: 'register',
    component: RegisterComponent,
    canActivate: [NotActivateTeam]
  },
  {
    path: 'login',
    component: SignupComponent,
    canActivate: [NotActivateTeam]
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
