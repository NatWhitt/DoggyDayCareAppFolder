import { DatePipe, formatDate } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Session } from 'app/models/session';
import { Staff } from 'app/models/staff';
import { SessionService } from 'app/services/session.service';
import { StaffService } from 'app/services/staff.service';

@Component({
  selector: 'app-session-details',
  templateUrl: './session-details.component.html',
  styleUrls: ['./session-details.component.css'],
})
export class SessionDetailsComponent {
  @Input() session!: Session;
  @Input() possibleStaff: Staff[] = [];

showCreateForm: boolean = false;
showDeleteOptions: boolean = false;
showEditOptions: boolean = false;

  formattedStartDate = '';
  view = 'details';
  showSelection: boolean = true;

  @Output() showSelectedSession: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private sessionService: SessionService,
    private staffService: StaffService,
    private datePipe: DatePipe
  ) {}
  ngOnInit(): void {
    console.log(this.session);
    console.log(this.possibleStaff);
  }
  showCreate() {
    this.showCreateForm = !this.showCreateForm;
  }
  showDelete() {
    this.showDeleteOptions = !this.showDeleteOptions;
  }
  showEdit() {
    this.showEditOptions = !this.showEditOptions;
  }

  getformattedStartDate() {
    this.datePipe.transform(this.session.sessionDateTime, 'yyyy-MM-ddTHH:mm');
    this.formattedStartDate = formatDate(
      this.session.sessionDateTime,
      'yyyy-MM-dd hh:mm:ssZZZZZ',
      'en_US'
    );
  }
  editSession(selectedSession: Session) {
    this.session = selectedSession;
    this.sessionService
      .updateSession(selectedSession)
      .subscribe((session: Session) => (selectedSession = session));
  }
  // removeStaff(removeStaff: Staff){
  //   this.session.staffList?.filter(s => s.id !== removeStaff.id)
  // }
  setView(page: string) {
    this.view = page;
  }

  hideSelection() {
    this.showSelection = false;
    this.showSelectedSession.emit(this.showSelection);
  }
}
