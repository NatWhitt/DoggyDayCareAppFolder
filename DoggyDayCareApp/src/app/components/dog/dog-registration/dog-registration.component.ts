import { formatDate } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RegistrationStatusEnum } from 'app/enums/registration-status-enum';
import { BookingWithRegistration } from 'app/models/booking-with-registration';
import { Dog } from 'app/models/dog';
import { RegistrationTake } from 'app/models/registration-take';
import { RegistrationService } from 'app/services/registration.service';

@Component({
  selector: 'app-dog-registration',
  templateUrl: './dog-registration.component.html',
  styleUrls: ['./dog-registration.component.css']
})
export class DogRegistrationComponent {
  @Input() currentDog!: Dog;
  bookingReg: BookingWithRegistration[] = [];
   registrationDetails: RegistrationTake[] = [];

   startDate: Date = new Date(new Date().getFullYear(), 0, 1); 
   formattedStartDate!: string;
   endDate: Date = new Date(new Date().getFullYear(), 11, 31);
   formattedEndDate!: string;
   
   statuses: String[];
   statusEnum = RegistrationStatusEnum;
 
   showEditOptions: boolean = false;
   showDeleteOptions: boolean = false;
   delete: boolean = false;
 
   constructor(private registrationService: RegistrationService){
     this.statuses = Object.keys(this.statusEnum)
   }
 
   ngOnInit():void{
    this.getformattedDate()
     this.registrationService.getPossibleDogRegistrations(this.currentDog.id ?? 0, this.formattedStartDate, this.formattedEndDate).subscribe((bookingReg) => this.bookingReg = bookingReg)
   }
   getformattedDate() {
    // return this.datePipe.transform(this.startDate, 'dd-MM-yyyy');
    this.formattedStartDate = formatDate(this.startDate, 'yyyy-MM-dd hh:mm:ssZZZZZ', 'en_US')
    // return this.datePipe.transform(this.endDate, 'dd-MM-yyyy');
    this.formattedEndDate = formatDate(this.endDate, 'yyyy-MM-dd hh:mm:ssZZZZZ', 'en_US')
  }

   getSessions(){
    this.getformattedDate()
    this.registrationService.getPossibleDogRegistrations(this.currentDog.id ?? 0, this.formattedStartDate, this.formattedEndDate).subscribe((bookingReg) => this.bookingReg = bookingReg)
  }
   
   showEdit(){
     this.showEditOptions = !this.showEditOptions;
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


  showDelete(){
    this.showDeleteOptions = !this.showDeleteOptions;
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
