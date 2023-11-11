import { DatePipe, formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { DayofWeek } from 'app/models/dayof-week';
import { Staff } from 'app/models/staff';
import { SessionService } from 'app/services/session.service';
import { StaffService } from 'app/services/staff.service';

@Component({
  selector: 'app-create-bulk-staff-link',
  templateUrl: './create-bulk-staff-link.component.html',
  styleUrls: ['./create-bulk-staff-link.component.css']
})
export class CreateBulkStaffLinkComponent {
  staff = {} as Staff;
  startDate = new Date();
  endDate = new Date();
  weekDaysToInclude: number[] = [];
  sessionType = 0;

  formattedStartDate = '';
  formattedEndDate ='';

  possibleStaff: Staff[] =[];

  daysOfWeek: DayofWeek[] = [
    {id: 0, dayName:'Sunday'},
    {id: 1, dayName:'Monday'},
    {id: 2, dayName:'Tuesday'},
    {id: 3, dayName:'Wednesday'},
    {id: 4, dayName:'Thursday'},
    {id: 5, dayName:'Friday'},
    {id: 6, dayName:'Saturday'}    
  ];
  
  constructor(private sessionService: SessionService, private datePipe: DatePipe, private staffService: StaffService){
    this.staffService.getStaffsByStatus(1).subscribe((staffs)=> this.possibleStaff = staffs)

  }
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
    if(!this.staff || !this.startDate || !this.endDate){
      alert('Please enter a valid entry');
      return;
    }

    const newBulkLink ={
      staffID: this.staff.id ?? 0,
      startDate: this.startDate,
      endDate: this.endDate,
      weekDaysToInclude: this.weekDaysToInclude,
      sessionType: this.sessionType,
    }
    if(newBulkLink.staffID > 0){
      this.sessionService.CreateBulkStaffLink(newBulkLink).subscribe();
    }

    

    this.startDate = new Date();
    this.endDate = new Date();
    this.weekDaysToInclude = [];
    this.sessionType = 0;
    this.formattedStartDate = '';
    this.formattedEndDate ='';  
  }


}
