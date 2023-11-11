import { DatePipe, formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { Staff } from 'app/models/staff';
import { SessionService } from 'app/services/session.service';
import { StaffService } from 'app/services/staff.service';

@Component({
  selector: 'app-create-session',
  templateUrl: './create-session.component.html',
  styleUrls: ['./create-session.component.css']
})
export class CreateSessionComponent {
  sessionName ='';
  sessionDateTime = new Date();
  sessionType = 0;
  sessionLengthInMinutes = 0;
  sessionSize =0;
  staffList:Staff[]= [];

  possibleStaff: Staff[] =[];
  formattedStartDate = '';


  constructor(private sessionService: SessionService, private datePipe: DatePipe, private staffService: StaffService){
    this.staffService.getStaffsByStatus(1).subscribe((staffs)=> this.possibleStaff = staffs)
  }
  getformattedStartDate() {
    this.datePipe.transform(this.sessionDateTime, 'yyyy-MM-ddTHH:mm');
    this.formattedStartDate = formatDate(this.sessionDateTime, 'yyyy-MM-dd hh:mm:ssZZZZZ', 'en_US')
    
  }

  onSubmitSingle(){
    if(!this.sessionName || !this.sessionDateTime){
      alert('Please enter a valid entry');
      return;
    }

    const newSession ={
      sessionName: this.sessionName,
      sessionDateTime : this.sessionDateTime,
      sessionType: this.sessionType,
      sessionLengthInMinutes: this.sessionLengthInMinutes,
      sessionSize: this.sessionSize,
      staffList: this.staffList
    }
    this.sessionService.createSession(newSession).subscribe();

    this.sessionName ='';
    this.sessionDateTime = new Date();
    this.sessionType = 0;
    this.sessionLengthInMinutes = 0;
    this.sessionSize =0;
  
  }

}
