import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

<<<<<<< HEAD
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SidebarComponent} from './sidebar/sidebar.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {HomeListComponent} from './home-list/home-list.component';
import {AddHomeComponent} from './add-home/add-home.component';
import {HomesComponent} from './homes/homes.component';
import {EditHomeComponent} from './edit-home/edit-home.component';
import { RegisterComponent } from './register/register.component';
import { SignupComponent } from './signup/signup.component';
import { FeaturedComponent } from './featured/featured.component';
import { HomeComponent } from './home/home.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
=======
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeListComponent } from './home-list/home-list.component';
import { AddHomeComponent } from './add-home/add-home.component';
import { FeaturedComponent } from './featured/featured.component';
>>>>>>> 2c1bc04dc477320c316272094f01ddaab3217a77

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    HomeListComponent,
    AddHomeComponent,
<<<<<<< HEAD
    HomesComponent,
    EditHomeComponent,
    RegisterComponent,
    SignupComponent,
    FeaturedComponent,
    HomeComponent
=======
    FeaturedComponent
>>>>>>> 2c1bc04dc477320c316272094f01ddaab3217a77
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
