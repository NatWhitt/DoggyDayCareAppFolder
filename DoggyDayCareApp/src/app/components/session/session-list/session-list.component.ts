import { DatePipe, formatDate } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Session } from 'app/models/session';
import { Staff } from 'app/models/staff';
import { SessionService } from 'app/services/session.service';
import { StaffService } from 'app/services/staff.service';

@Component({
  selector: 'app-session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.css']
})
export class SessionListComponent {
  sessions: Session[] = [];
  session = {} as Session;
  possibleStaff: Staff[] =[];

  startDate!: Date; 
  formattedStartDate!: string;
  endDate!: Date;
  formattedEndDate!: string;

  showDeleteOptions: boolean = false;
  delete: Boolean = false;
  create: Boolean = false;
  view = '';
  showSelected = false;

  @Output() currentSession: EventEmitter<Session> = new EventEmitter();
  @Output() staffList: EventEmitter<Staff[]> = new EventEmitter();

  constructor(private sessionService: SessionService,private staffService: StaffService, private datePipe: DatePipe){
    this.staffService.getStaffsByStatus(1).subscribe((staffs)=> this.possibleStaff = staffs)
  }
  

  getformattedStartDate() {
    // return this.datePipe.transform(this.startDate, 'dd-MM-yyyy');
    this.formattedStartDate = formatDate(this.startDate, 'yyyy-MM-dd hh:mm:ssZZZZZ', 'en_US')
    // return this.datePipe.transform(this.endDate, 'dd-MM-yyyy');
    this.formattedEndDate = formatDate(this.endDate, 'yyyy-MM-dd hh:mm:ssZZZZZ', 'en_US')
  }
  // getformattedEndDate() {
  //   // return this.datePipe.transform(this.endDate, 'dd-MM-yyyy');
  //   return this.formattedEndDate = formatDate(this.endDate, 'yyyy-MM-dd hh:mm:ssZZZZZ', 'en_US')
  // }
 
  getSessions(){
    this.getformattedStartDate();
    this.sessionService.getSessionDetails(this.formattedStartDate, this.formattedEndDate).subscribe((sessions) => this.sessions = sessions);
  }

  showDelete(){
    this.showDeleteOptions = !this.showDeleteOptions;
  }
  deleteButton(){
    this.delete = !this.delete;
  }
  
  deleteSession(deleteSession: Session){
    this.sessionService.deleteSession(deleteSession).subscribe(() => this.sessions = this.sessions.filter(s => s.id !== deleteSession.id))
    this.delete = false;
  }

  selectSession(selectedSession: Session){
    this.session = selectedSession;
    this.staffList.emit(this.possibleStaff);
    this.showSelected = true;
  }
  hideSession(status: boolean){
    this.showSelected = status;
  }



}
