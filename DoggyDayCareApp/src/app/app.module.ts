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
import { DogContactListComponent } from './components/contacts/contact-list/dog-contact-list.component';
import { DogCoreInformationComponent } from './components/dog components/dog-core-information/dog-core-information.component';
import { CreateContactComponent } from './components/contacts/contact-list/create-contact/create-contact.component';
import { LinkExistingContactComponent } from './components/contacts/contact-list/link-existing-contact/link-existing-contact.component';

import { StaffListComponent } from './components/staff/staff-list/staff-list.component';
import { StaffProfileComponent } from './components/staff/staff-profile/staff-profile.component';
import { StaffCoreInformationComponent } from './components/staff/staff-core-information/staff-core-information.component';
import { CreateStaffComponent } from './components/staff/create-staff/create-staff.component';



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
    DogContactListComponent,
    DogCoreInformationComponent,
    CreateContactComponent,
    LinkExistingContactComponent,
    StaffListComponent,
    StaffProfileComponent,
    StaffCoreInformationComponent,
    CreateStaffComponent
    
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
