import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http'
import {FormsModule} from '@angular/forms'
import { DatePipe } from '@angular/common';

import { AppComponent } from './app.component';
import { BreedComponent } from './components/breed/breed.component';
import { DogComponent } from './components/dog components/dog-list/dog-list.component';
import { DogProfileComponent } from './components/dog components/dog-profile/dog-profile.component';
import { CreateDogComponent } from './components/dog components/create-dog/create-dog.component';
import { HeaderComponent } from './components/utility/header/header.component';
import { FooterComponent } from './components/utility/footer/footer.component';
import { MenuBarComponent } from './components/utility/menu-bar/menu-bar.component';
import { ContactListComponent } from './components/contacts/contact-list/contact-list.component';



@NgModule({
  declarations: [
    AppComponent,
    BreedComponent,
    DogComponent,
    DogProfileComponent,
    CreateDogComponent,
    HeaderComponent,
    FooterComponent,
    MenuBarComponent,
    ContactListComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
