import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UIService } from 'app/services/ui.service';
import { Subscription } from 'rxjs';

import { NgOptimizedImage } from '@angular/common';
import { User } from 'app/auth/user';
import { AccountService } from 'app/auth/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  title: string = 'Doggy Day Care';
  @Input() loggedInUser: User | undefined;
  @Output() loggedOutUser: EventEmitter<User> = new EventEmitter<User>();

  ngOnInit(): void {}

  constructor(private uiService: UIService, private router: Router, private accountService: AccountService) {}

  hasRoute(route: string) {
    return this.router.url == route;
  }

  logOut(){
    console.log('Logged out');
    this.loggedInUser={};
    this.loggedOutUser.emit(this.loggedInUser)
    localStorage.removeItem('user');
    this.accountService.logOut();
  }
}
