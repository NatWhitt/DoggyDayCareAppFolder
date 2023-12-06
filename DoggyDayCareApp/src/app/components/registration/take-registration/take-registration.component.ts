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
  styleUrls: ['./take-registration.component.css']
})
export class TakeRegistrationComponent {
  sessions: Session[] = [];
  session = {} as Session;
  
  date = new Date().toISOString().substring(0,10); 
  formattedDate!: string;

  view = '';
  showSelected = false;
  showSessions = true;

  bookingReg: BookingWithRegistration[] = [];
  registrationDetails: RegistrationTake[] = [];
  statuses: String[];
  statusEnum = RegistrationStatusEnum;
  

  constructor(private sessionService: SessionService, private registrationService: RegistrationService, private datePipe: DatePipe){
    this.statuses = Object.keys(this.statusEnum)
  }

  
  getformattedDate() {
    
    this.formattedDate = formatDate(this.date, 'yyyy-MM-dd hh:mm:ssZZZZZ', 'en_US')
    
  }
  getSessions(){
    this.getformattedDate();
    this.sessionService.getDaySessionDetails(this.formattedDate).subscribe((sessions) => this.sessions = sessions);
  }

  selectRegistrationSession(selectedSession: Session){
    this.session = selectedSession;
    this.registrationService.getPossibleRegistrationsSingleSession(this.session.id ?? 0).subscribe((bookingReg) => this.bookingReg = bookingReg)
    this.showSelected = true;
    this.showSessions = false;
  }
  sessionControl(){
    this.showSessions = !this.showSessions;
    this.sessions = [] as Session[];
  }

  saveRegistration(){
    this.registrationDetails =[];

    this.bookingReg.forEach(booking => {
       let newRegistration: RegistrationTake={
        id: booking.registrationDetails.id,
        bookingId: booking.id ?? 0,
        registrationStaffId: 2,
        registrationStatus: booking.registrationDetails.registrationStatus,
        note:booking.registrationDetails.note
        }    
        this.registrationDetails.push(newRegistration);
    })
    this.registrationService.bulkCreateRegistration(this.registrationDetails).subscribe();    
  }
}
