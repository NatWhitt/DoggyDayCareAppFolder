import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from './auth/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'DoggyDayCareApp';
  user: User | undefined;
  loggedin :boolean = false;

  @Output() outLoggedInUser: EventEmitter<User> = new EventEmitter();
  logIn(loggedInUser: any) {
    this.user = loggedInUser;
    this.outLoggedInUser.emit(this.user);
    this.loggedin = true;
  }

  LogOut(loggedOutUser: any) {
    this.user = loggedOutUser;
    this.loggedin = false;
  }
}
