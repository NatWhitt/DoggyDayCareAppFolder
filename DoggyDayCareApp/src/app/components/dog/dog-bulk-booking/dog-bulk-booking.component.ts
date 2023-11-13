import { DatePipe, formatDate } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DayofWeek } from 'app/models/dayof-week';
import { Dog } from 'app/models/dog';
import { BookingService } from 'app/services/booking.service';

@Component({
  selector: 'app-dog-bulk-booking',
  templateUrl: './dog-bulk-booking.component.html',
  styleUrls: ['./dog-bulk-booking.component.css']
})
export class DogBulkBookingComponent {
  @Input() currentDog!: Dog;
  startDate = new Date();
  endDate = new Date();
  weekDaysToInclude: number[] = [];
  sessionType = 0;


  formattedStartDate = '';
  formattedEndDate ='';

  daysOfWeek: DayofWeek[] = [
    {id: 0, dayName:'Sunday'},
    {id: 1, dayName:'Monday'},
    {id: 2, dayName:'Tuesday'},
    {id: 3, dayName:'Wednesday'},
    {id: 4, dayName:'Thursday'},
    {id: 5, dayName:'Friday'},
    {id: 6, dayName:'Saturday'}    
  ];

  constructor(private bookingService: BookingService, private datePipe: DatePipe){}

  getformattedDate() {
    this.datePipe.transform(this.startDate, 'yyyy-MM-ddTHH:mm');
    this.formattedStartDate = formatDate(this.startDate, 'yyyy-MM-dd hh:mm:ssZZZZZ', 'en_US')
    this.datePipe.transform(this.endDate, 'yyyy-MM-ddTHH:mm');
    this.formattedStartDate = formatDate(this.endDate, 'yyyy-MM-dd hh:mm:ssZZZZZ', 'en_US')
  }

  addToDayList(dayNumber:number){
    this.weekDaysToInclude.push(dayNumber);
  }

  onSubmitBulk(){
    if(!this.startDate || !this.endDate || !this.weekDaysToInclude){
      alert('Please enter a valid entry');
      return;
    }

    const newBookingBulk ={
      dogID : this.currentDog.id ?? 0,
      startDate: this.startDate,
      endDate: this.endDate,
      weekDaysToInclude: this.weekDaysToInclude,
      sessionType:this.sessionType
    }
    this.bookingService.createBulkBooking(newBookingBulk).subscribe();

    
    this.startDate = new Date();
    this.endDate = new Date();
    this.weekDaysToInclude = [];
    this.sessionType =0;

  }

}
