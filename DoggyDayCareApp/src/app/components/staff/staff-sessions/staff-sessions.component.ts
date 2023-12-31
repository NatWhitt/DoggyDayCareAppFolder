import { DatePipe, formatDate } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Session } from 'app/models/session';
import { Staff } from 'app/models/staff';
import { StaffLinkRequest } from 'app/models/staff-link-request';
import { SessionService } from 'app/services/session.service';
import { StaffService } from 'app/services/staff.service';

@Component({
  selector: 'app-staff-sessions',
  templateUrl: './staff-sessions.component.html',
  styleUrls: ['./staff-sessions.component.css']
})
export class StaffSessionsComponent {
  @Input() staff!: Staff;
  startDate: Date = new Date(new Date().getFullYear(), 0, 1); 
  formattedStartDate!: string;
  endDate: Date = new Date(new Date().getFullYear(), 11, 31);
  formattedEndDate!: string;

  showDeleteOptions: boolean = false;
  delete: Boolean = false;

  sessions: Session[] = [];
  

  constructor(private staffService: StaffService, private sessionService: SessionService, private route: ActivatedRoute, private datePipe:DatePipe){}
  
  ngOnInit():void {
    this.getformattedDate()
    this.sessionService.getStaffSessionDetails(this.staff.id ?? 0, this.formattedStartDate, this.formattedEndDate).subscribe((sessions) => this.sessions = sessions);
   }

  getformattedDate() {
    this.formattedStartDate = formatDate(this.startDate, 'yyyy-MM-dd hh:mm:ssZZZZZ', 'en_US')
    this.formattedEndDate = formatDate(this.endDate, 'yyyy-MM-dd hh:mm:ssZZZZZ', 'en_US')
  }

  getSessions(){
    this.getformattedDate();
    this.sessionService.getStaffSessionDetails(this.staff.id ?? 0, this.formattedStartDate, this.formattedEndDate).subscribe((sessions) => this.sessions = sessions);
  }
  showDelete(){
    this.showDeleteOptions = !this.showDeleteOptions;
  }
  deleteButton(){
    this.delete = !this.delete;
  }

  deleteSessionLink(selectedSession: Session){
    const deleteRequest = {
      sessionId: selectedSession.id ?? 0,
      staffId: this.staff.id ?? 0
    }

    this.sessionService.deleteSessionLink(deleteRequest).subscribe(() => this.sessions = this.sessions.filter(s => s.id !== selectedSession.id))
    this.delete = false;
  }

}
