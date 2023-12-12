import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';

import { AppComponent } from './app.component';
import { BreedComponent } from './components/breed/breed.component';
import { DogComponent } from './components/dog/dog-list/dog-list.component';
import { DogProfileComponent } from './components/dog/dog-profile/dog-profile.component';
import { CreateDogComponent } from './components/dog/create-dog/create-dog.component';
import { HeaderComponent } from './components/utility/header/header.component';
import { FooterComponent } from './components/utility/footer/footer.component';
import { MenuBarComponent } from './components/utility/menu-bar/menu-bar.component';
import { DogContactListComponent } from './components/contacts/contact-list/dog-contact-list.component';
import { DogCoreInformationComponent } from './components/dog/dog-core-information/dog-core-information.component';
import { CreateContactComponent } from './components/contacts/contact-list/create-contact/create-contact.component';
import { LinkExistingContactComponent } from './components/contacts/contact-list/link-existing-contact/link-existing-contact.component';

import { StaffListComponent } from './components/staff/staff-list/staff-list.component';
import { StaffProfileComponent } from './components/staff/staff-profile/staff-profile.component';
import { StaffCoreInformationComponent } from './components/staff/staff-core-information/staff-core-information.component';
import { CreateStaffComponent } from './components/staff/create-staff/create-staff.component';
import { SessionListComponent } from './components/session/session-list/session-list.component';
import { CreateSessionComponent } from './components/session/create-session/create-session.component';
import { CreateBulkSessionsComponent } from './components/session/create-bulk-sessions/create-bulk-sessions.component';
import { SessionDetailsComponent } from './components/session/session-details/session-details.component';
import { CreateBulkStaffLinkComponent } from './components/session/create-bulk-staff-link/create-bulk-staff-link.component';
import { StaffSessionsComponent } from './components/staff/staff-sessions/staff-sessions.component';
import { SessionBookingsComponent } from './components/session/session-bookings/session-bookings.component';
import { DogBookingsComponent } from './components/dog/dog-bookings/dog-bookings.component';
import { DogBulkBookingComponent } from './components/dog/dog-bulk-booking/dog-bulk-booking.component';
import { SessionRegistrationComponent } from './components/session/session-registration/session-registration.component';
import { DogRegistrationComponent } from './components/dog/dog-registration/dog-registration.component';
import { TakeRegistrationComponent } from './components/registration/take-registration/take-registration.component';



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
    CreateStaffComponent,
    SessionListComponent,
    CreateSessionComponent,
    CreateBulkSessionsComponent,
    SessionDetailsComponent,
    CreateBulkStaffLinkComponent,
    StaffSessionsComponent,
    SessionBookingsComponent,
    DogBookingsComponent,
    DogBulkBookingComponent,
    SessionRegistrationComponent,
    DogRegistrationComponent,
    TakeRegistrationComponent
    
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
