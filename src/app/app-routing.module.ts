import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeListComponent} from './home-list/home-list.component';
import {AddHomeComponent} from './add-home/add-home.component';
import {HomesComponent} from './homes/homes.component';
import {EditHomeComponent} from './edit-home/edit-home.component';
import {RegisterComponent} from './register/register.component';
import {SignupComponent} from './signup/signup.component';
import {ChangePassComponent} from './change-pass/change-pass.component';


const routes: Routes = [
  {
    path: 'home-list', component: HomeListComponent
  },
  {
    path: 'add-home', component: AddHomeComponent
  },
  {
    path: 'home/:homeId/:name', component: HomesComponent
  },
  {
    path: 'home-edit/:homeId', component: EditHomeComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: SignupComponent,
  },
  {
    path: 'change-password',
    component: ChangePassComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
