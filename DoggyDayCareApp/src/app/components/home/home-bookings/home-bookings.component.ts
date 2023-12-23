import { Component, Input } from '@angular/core';
import { Dog } from 'app/models/dog';
import { Session } from 'app/models/session';
import { Staff } from 'app/models/staff';
import { BookingService } from 'app/services/booking.service';

@Component({
  selector: 'app-home-bookings',
  templateUrl: './home-bookings.component.html',
  styleUrls: ['./home-bookings.component.css']
})
export class HomeBookingsComponent {
  @Input() inSession!: Session;
  bookedDogs: Dog[] = [];
  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.bookingService
      .getBookingsSingleSession(this.inSession.id ?? 0)
      .subscribe((booking) => (this.bookedDogs = booking));
  }

}