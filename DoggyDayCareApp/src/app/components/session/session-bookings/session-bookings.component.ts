import { Component, Input } from '@angular/core';
import { BookingSession } from 'app/models/booking-session';
import { Dog } from 'app/models/dog';
import { Session } from 'app/models/session';
import { BookingService } from 'app/services/booking.service';

@Component({
  selector: 'app-session-bookings',
  templateUrl: './session-bookings.component.html',
  styleUrls: ['./session-bookings.component.css']
})
export class SessionBookingsComponent {
  @Input() session!: Session;
  bookedDogs: Dog[] = [];
  showCreateForm: boolean = false;
  showDeleteOptions: boolean = false;
  delete: boolean = false;

  newBookingDog = {} as Dog;
  avilableDogs: Dog[] = [];



  constructor(private bookingService: BookingService){
  }

  ngOnInit():void{
    console.log(this.session);
    
    this.bookingService.getBookingsSingleSession(this.session.id ?? 0).subscribe((booking) => this.bookedDogs = booking);
    this.bookingService.getAllAvailableDogsForSingleSession(this.session.id ?? 0).subscribe((dogs) => this.avilableDogs = dogs);   
  }

  showDelete(){
    this.showDeleteOptions = !this.showDeleteOptions;
  }
    showCreate(){
    this.showCreateForm = !this.showCreateForm;
    
  }
  deleteButton(){
    this.delete = !this.delete;
  }

  deleteBooking(bookedDog:Dog){
    const deleteBooking ={
      sessionId: this.session.id  ?? 0,
      dogId: bookedDog.id ?? 0
    }
    this.bookingService.deleteBooking(deleteBooking).subscribe(() => this.bookedDogs = this.bookedDogs.filter(d => d.id !== bookedDog.id))
  }
  createBooking(){
    console.log(this.avilableDogs);
    
    const createBooking ={
      sessionId: this.session.id  ?? 0,
      dogId: this.newBookingDog.id ?? 0
    }
    this.bookingService.createBooking(createBooking).subscribe();
    this.ngOnInit();
  }
}
