import { DatePipe, formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { RegistrationStatusEnum } from 'app/enums/registration-status-enum';
import { BookingWithRegistration } from 'app/models/booking-with-registration';
import { RegistrationTake } from 'app/models/registration-take';
import { Session } from 'app/models/session';
import { RegistrationService } from 'app/services/registration.service';
import { SessionService } from 'app/services/session.service';

@Component({
  selector: 'app-take-registration',
  templateUrl: './take-registration.component.html',
  styleUrls: ['./take-registration.component.css'],
})
export class TakeRegistrationComponent {
  sessions: Session[] = [];
  session = {} as Session;
  sessionid = 0;

  date = new Date().toISOString().substring(0, 10);
  formattedDate!: string;

  view = '';
  showSelected = false;
  showSessions = true;

  bookingReg: BookingWithRegistration[] = [];
  registrationDetails: RegistrationTake[] = [];
  statuses: String[];
  statusEnum = RegistrationStatusEnum;

  constructor(
    private sessionService: SessionService,
    private registrationService: RegistrationService,
    private datePipe: DatePipe
  ) {
    this.statuses = Object.keys(this.statusEnum);
    this.formattedDate = formatDate(
      this.date,
      'yyyy-MM-dd hh:mm:ssZZZZZ',
      'en_US'
    );
    this.getSessions();
  }

  getformattedDate(date: Date) {
    this.formattedDate = formatDate(date, 'yyyy-MM-dd hh:mm:ssZZZZZ', 'en_US');
    this.getSessions();
  }

  getSessions() {
    this.sessionService
      .getDaySessionDetails(this.formattedDate)
      .subscribe((sessions) => (this.sessions = sessions));
  }

  selectRegistrationSession() {
    this.sessionService.getSession(this.sessionid ?? 0).subscribe((session) => (this.session = session));
    this.registrationService
      .getPossibleRegistrationsSingleSession(this.sessionid ?? 0)
      .subscribe((bookingReg) => (this.bookingReg = bookingReg));
    this.showSelected = true;
    this.showSessions = false;
  }

  sessionControl() {
    this.showSessions = !this.showSessions;
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
