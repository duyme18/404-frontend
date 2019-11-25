import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SidebarComponent} from './sidebar/sidebar.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {HomeListComponent} from './home-list/home-list.component';
import {AddHomeComponent} from './add-home/add-home.component';
import {EditHomeComponent} from './edit-home/edit-home.component';
import {RegisterComponent} from './register/register.component';
import {SignupComponent} from './signup/signup.component';
import {FeaturedComponent} from './featured/featured.component';
import {HomeComponent} from './home/home.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {GoogleMapComponent} from './google-map/google-map.component';
import {AgmCoreModule} from '@agm/core';
import {HomeDetailComponent} from './home-detail/home-detail.component';
import {BookingComponent} from './booking/booking.component';
import {Permissions} from './deactivate/permissions';
import {NotActivateTeam} from './deactivate/not-activate-team';
import {IsAdmin} from './deactivate/is-admin';
import {CanActivateTeam} from './deactivate/can-activate-team';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    HomeListComponent,
    AddHomeComponent,
    EditHomeComponent,
    RegisterComponent,
    SignupComponent,
    FeaturedComponent,
    HomeComponent,
    FeaturedComponent,
    GoogleMapComponent,
    HomeDetailComponent,
    BookingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBL1psdbu18dDFFpDlMOuASQl-65r72vJE'
    })
  ],
  providers: [Permissions, CanActivateTeam, NotActivateTeam, IsAdmin],
  bootstrap: [AppComponent]
})
export class AppModule {
}
