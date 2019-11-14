import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeListComponent} from './home-list/home-list.component';
import {AddHomeComponent} from './add-home/add-home.component';


const routes: Routes = [
  {
    path: 'home-list', component: HomeListComponent
  },
  {
    path: 'add-home', component: AddHomeComponent
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
