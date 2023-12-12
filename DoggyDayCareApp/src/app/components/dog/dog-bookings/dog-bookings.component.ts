import { formatDate } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Dog } from 'app/models/dog';
import { Session } from 'app/models/session';
import { BookingService } from 'app/services/booking.service';

@Component({
  selector: 'app-dog-bookings',
  templateUrl: './dog-bookings.component.html',
  styleUrls: ['./dog-bookings.component.css']
})
export class DogBookingsComponent {
  @Input() currentDog!: Dog;
   sessions: Session[] = [];

   startDate: Date = new Date(new Date().getFullYear(), 0, 1); 
   formattedStartDate!: string;
   endDate: Date = new Date(new Date().getFullYear(), 11, 31);
   formattedEndDate!: string;

   showDeleteOptions: boolean = false;
   delete: Boolean = false;
   view: string = 'list';

   newBookingSession = {} as Session;
   avilableSessions: Session[] = [];

   constructor(private bookingService: BookingService){}

   ngOnInit():void {
    this.getformattedDate()
    this.bookingService.getDogBookings(this.currentDog.id ?? 0, this.formattedStartDate, this.formattedEndDate).subscribe((sessions) => this.sessions = sessions);
    this.bookingService.GetAllAvailableSessionsForDog(this.currentDog.id ?? 0).subscribe((sessions) => this.avilableSessions = sessions);
   }

   getformattedDate() {
    // return this.datePipe.transform(this.startDate, 'dd-MM-yyyy');
    this.formattedStartDate = formatDate(this.startDate, 'yyyy-MM-dd hh:mm:ssZZZZZ', 'en_US')
    // return this.datePipe.transform(this.endDate, 'dd-MM-yyyy');
    this.formattedEndDate = formatDate(this.endDate, 'yyyy-MM-dd hh:mm:ssZZZZZ', 'en_US')
  }
  getSessions(){
    this.getformattedDate()
    this.bookingService.getDogBookings(this.currentDog.id ?? 0, this.formattedStartDate, this.formattedEndDate).subscribe((sessions) => this.sessions = sessions);
  }

  showDelete(){
    this.showDeleteOptions = !this.showDeleteOptions;
  }
  deleteButton(){
    this.delete = !this.delete;
  }
  
  deleteBooking(deleteSession: Session){
    const deleteBooking ={
      sessionId: deleteSession.id  ?? 0,
      dogId: this.currentDog.id ?? 0
    }
    this.bookingService.deleteBooking(deleteBooking).subscribe(() => this.sessions = this.sessions.filter(s => s.id !== deleteSession.id))
    this.delete = false;
  }

  showCreate(){
    if(this.view != 'create'){
      this.view = 'create';
    }
    else{
    this.view = 'list'
    }
  }
  showBulkCreate(){
    if(this.view != 'bulkCreate'){
      this.view = 'bulkCreate';
    }
    else{this.view = 'list'}
    
  }

  createBooking(){
    const createBooking ={
      sessionId: this.newBookingSession.id  ?? 0,
      dogId: this.currentDog.id ?? 0
    }
    this.bookingService.createBooking(createBooking).subscribe();
    this.ngOnInit();
  }

}
