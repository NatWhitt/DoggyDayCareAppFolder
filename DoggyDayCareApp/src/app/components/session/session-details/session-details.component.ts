import { DatePipe, formatDate } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Session } from 'app/models/session';
import { Staff } from 'app/models/staff';
import { SessionService } from 'app/services/session.service';
import { StaffService } from 'app/services/staff.service';

@Component({
  selector: 'app-session-details',
  templateUrl: './session-details.component.html',
  styleUrls: ['./session-details.component.css']
})
export class SessionDetailsComponent {

  @Input() session!: Session;
  possibleStaff: Staff[] =[];
  formattedStartDate = '';

  constructor(private sessionService: SessionService, private staffService: StaffService, private datePipe: DatePipe){
    this.staffService.getStaffsByStatus(1).subscribe((staffs)=> this.possibleStaff = staffs)
  }
  getformattedStartDate() {
    this.datePipe.transform(this.session.sessionDateTime, 'yyyy-MM-ddTHH:mm');
    this.formattedStartDate = formatDate(this.session.sessionDateTime, 'yyyy-MM-dd hh:mm:ssZZZZZ', 'en_US')
  }
  editSession(selectedSession:Session){
    this.session = selectedSession;  
    this.sessionService.updateSession(selectedSession).subscribe((session:Session) => selectedSession = session)
  }
  // removeStaff(removeStaff: Staff){
  //   this.session.staffList?.filter(s => s.id !== removeStaff.id)
  // }


}
