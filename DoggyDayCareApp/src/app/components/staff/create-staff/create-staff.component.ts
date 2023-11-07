import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { StaffService } from 'app/services/staff.service';

@Component({
  selector: 'app-create-staff',
  templateUrl: './create-staff.component.html',
  styleUrls: ['./create-staff.component.css']
})
export class CreateStaffComponent {

  title: string;
  forename : string;
  surname : string;
  startDate: Date;
  systemStatus:number;
  showAddDog: boolean = false;


  constructor (private staffService: StaffService,  private datePipe: DatePipe) {
    this.title = '';
    this.forename = '';
    this.surname = '';
    this.startDate = new Date();
    this.systemStatus =1;

}
get formattedDate() {
  return this.datePipe.transform(this.startDate, 'dd-MM-yyyy');
}

onSubmit(){
  if(!this.forename || !this.surname){
    alert('Please enter a valid entry');
    return;
  }
  const newStaff={
    title: this.title,
    forename: this.forename,
    surname: this.surname,     
    startDate: this.startDate,
    systemStatus: this.systemStatus,
  }

  this.staffService.createStaff(newStaff).subscribe();

  this.title = '';
  this.forename = '';
  this.surname = '';
  this.startDate = new Date();
  this.systemStatus =1;

}
}
