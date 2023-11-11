import { DatePipe, formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { DayofWeek } from 'app/models/dayof-week';
import { Staff } from 'app/models/staff';
import { SessionService } from 'app/services/session.service';
import { StaffService } from 'app/services/staff.service';

@Component({
  selector: 'app-create-bulk-sessions',
  templateUrl: './create-bulk-sessions.component.html',
  styleUrls: ['./create-bulk-sessions.component.css']
})
export class CreateBulkSessionsComponent {
  
  startDateTime = new Date();
  endDate = new Date();
  weekDaysToInclude: number[] = [];
  sessionName ='';
  sessionType = 0;
  sessionLengthInMinutes = 0;
  sessionSize =0;
  formattedStartDate = '';
  formattedEndDate ='';
  staffList:Staff[]= [];

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
    this.datePipe.transform(this.startDateTime, 'yyyy-MM-ddTHH:mm');
    this.formattedStartDate = formatDate(this.startDateTime, 'yyyy-MM-dd hh:mm:ssZZZZZ', 'en_US')
    this.datePipe.transform(this.endDate, 'yyyy-MM-ddTHH:mm');
    this.formattedStartDate = formatDate(this.endDate, 'yyyy-MM-dd hh:mm:ssZZZZZ', 'en_US')
  }

  addToDayList(dayNumber:number){
    this.weekDaysToInclude.push(dayNumber);
  }

  addToStaffList(dayNumber:number){
    this.weekDaysToInclude.push(dayNumber);
  }

  onSubmitBulk(){
    if(!this.sessionName || !this.startDateTime || !this.endDate){
      alert('Please enter a valid entry');
      return;
    }

    const newSessionBulk ={
      startDateTime: this.startDateTime,
      endDate: this.endDate,
      weekDaysToInclude: this.weekDaysToInclude,
      sessionName: this.sessionName,
      sessionType: this.sessionType,
      sessionLengthInMinutes: this.sessionLengthInMinutes,
      sessionSize: this.sessionSize,
      staffList : this.staffList
    }
    this.sessionService.createBulkSessions(newSessionBulk).subscribe();

    this.startDateTime = new Date();
    this.endDate = new Date();
    this.weekDaysToInclude = [];
    this.sessionName ='';
    this.sessionType = 0;
    this.sessionLengthInMinutes = 0;
    this.sessionSize =0;
    this.formattedStartDate = '';
    this.formattedEndDate ='';
    this.staffList = [];

  
  }

}
