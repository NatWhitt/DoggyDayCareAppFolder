import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from './auth/user';
import { StaffService } from './services/staff.service';
import { Staff } from './models/staff';
import { first } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @Output() outloggedInUser: EventEmitter<Staff> = new EventEmitter();
  title: string = 'Doggy Day Care';
  loggedInUser!: Staff
  loggedin :boolean = false;

  constructor(private staffServices: StaffService, public router: Router){}

  

  logIn(loggedInUserEmail: any) {
    this.loggedin = true; 
    this.staffServices.getStaffByEmail(loggedInUserEmail).pipe(first()).subscribe({
      next: (staff : Staff) => this.loggedInUser = staff,
    error: () => {this.loggedInUser = {title: '', forename: 'Unkown', surname: 'User', email:'', systemStatus: 1, phoneNumber:'' } },
  });
  }

  LogOut(loggedOutUser: any) {
    this.loggedin = false;
  }
}
