import { Component, Input } from '@angular/core';
import { RegistrationStatusEnum } from 'app/enums/registration-status-enum';
import { Booking } from 'app/models/booking';
import { BookingWithRegistration } from 'app/models/booking-with-registration';
import { RegistrationTake } from 'app/models/registration-take';
import { Session } from 'app/models/session';
import { RegistrationService } from 'app/services/registration.service';

@Component({
  selector: 'app-session-registration',
  templateUrl: './session-registration.component.html',
  styleUrls: ['./session-registration.component.css']
})
export class SessionRegistrationComponent {
  @Input() session!: Session;
  @Input() showEditOptions: boolean = false;
  @Input() showDeleteOptions: boolean = false;
  bookingReg: BookingWithRegistration[] = [];
  registrationDetails: RegistrationTake[] = [];
  statuses: String[];
  statusEnum = RegistrationStatusEnum;


  delete: boolean = false;

  constructor(private registrationService: RegistrationService){
    this.statuses = Object.keys(this.statusEnum)
  }

  ngOnInit():void{
    this.registrationService.getPossibleRegistrationsSingleSession(this.session.id ?? 0).subscribe((bookingReg) => this.bookingReg = bookingReg)
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
    this.showEditOptions = false;
  }


  deleteButton(){
    this.delete = !this.delete;
  }

  deleteRegistration(registrationId: number){
    if(registrationId >0){
      this.registrationService.deleteRegistration(registrationId).subscribe();
    }
      alert('Please enter a valid entry');
  }

}
