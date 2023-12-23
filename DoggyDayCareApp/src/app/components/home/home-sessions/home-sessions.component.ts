import { DatePipe, formatDate } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Session } from 'app/models/session';
import { Staff } from 'app/models/staff';
import { SessionService } from 'app/services/session.service';
import { StaffService } from 'app/services/staff.service';

@Component({
  selector: 'app-home-sessions',
  templateUrl: './home-sessions.component.html',
  styleUrls: ['./home-sessions.component.css'],
})
export class HomeSessionsComponent {
  @Input() inloggedInUser!: Staff;
  @Output() outSession: EventEmitter<Session> = new EventEmitter();

  selectedSession!: Session 

  startDate: Date = new Date();
  formattedStartDate!: string;
  endDate: Date = new Date();
  formattedEndDate!: string;

  sessions: Session[] = [];
  display = 'Session';

  constructor(
    private staffService: StaffService,
    private sessionService: SessionService,
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    console.log(this.inloggedInUser);

    this.startDate.setHours(3);
    this.startDate.setMinutes(0);

    console.log(this.startDate);
    console.log(this.endDate);
    this.endDate.setDate(this.startDate.getDate() + 1);

    this.getformattedDate();
    this.sessionService
      .getStaffSessionDetails(
        this.inloggedInUser.id ?? 0,
        this.formattedStartDate,
        this.formattedEndDate
      )
      .subscribe((sessions) => (this.sessions = sessions));
  }

  getformattedDate() {
    this.formattedStartDate = formatDate(
      this.startDate,
      'yyyy-MM-dd hh:mm:ssZZZZZ',
      'en_US'
    );
    this.formattedEndDate = formatDate(
      this.endDate,
      'yyyy-MM-dd hh:mm:ssZZZZZ',
      'en_US'
    );
  }

  getSessions() {
    this.getformattedDate();
    this.sessionService
      .getStaffSessionDetails(
        this.inloggedInUser.id ?? 0,
        this.formattedStartDate,
        this.formattedEndDate
      )
      .subscribe((sessions) => (this.sessions = sessions));
  }
  showBookings(session: Session){
    this.display='Booking';
    this.selectedSession = session;
    this.outSession.emit(this.selectedSession);
  }
  showRegistrations(session: Session){
    this.display='Registration';
    this.selectedSession = session;
    this.outSession.emit(this.selectedSession);
  }
  showList(){
    this.display='Session';
  }
}
