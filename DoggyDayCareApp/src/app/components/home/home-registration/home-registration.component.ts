import { Component, Input } from '@angular/core';
import { RegistrationStatusEnum } from 'app/enums/registration-status-enum';
import { BookingWithRegistration } from 'app/models/booking-with-registration';
import { Dog } from 'app/models/dog';
import { RegistrationTake } from 'app/models/registration-take';
import { Session } from 'app/models/session';
import { Staff } from 'app/models/staff';
import { RegistrationService } from 'app/services/registration.service';

@Component({
  selector: 'app-home-registration',
  templateUrl: './home-registration.component.html',
  styleUrls: ['./home-registration.component.css']
})
export class HomeRegistrationComponent {
  @Input() inSession!: Session;
  bookingReg: BookingWithRegistration[] = [];
  registrationDetails: RegistrationTake[] = [];
  statuses: String[];
  statusEnum = RegistrationStatusEnum;

  constructor(private registrationService: RegistrationService) {
    this.statuses = Object.keys(this.statusEnum);
  }

  ngOnInit(): void {
    this.registrationService
      .getPossibleRegistrationsSingleSession(this.inSession.id ?? 0)
      .subscribe((bookingReg) => (this.bookingReg = bookingReg));
  }

  remainingAsPresent(){
    this.bookingReg.forEach(registration => {
      if(registration.registrationDetails.registrationStatus.length == 0){
        console.log(registration);
        registration.registrationDetails.registrationStatus = 'Present'
        console.log(registration);
      }      
    });
  }
  
  saveRegistration() {
    this.registrationDetails = [];

    this.bookingReg.forEach((booking) => {
      let newRegistration: RegistrationTake = {
        id: booking.registrationDetails.id,
        bookingId: booking.id ?? 0,
        registrationStaffId: 2,
        registrationStatus: booking.registrationDetails.registrationStatus,
        note: booking.registrationDetails.note,
      };
      this.registrationDetails.push(newRegistration);
    });
    this.registrationService
      .bulkCreateRegistration(this.registrationDetails)
      .subscribe();
  }

}
