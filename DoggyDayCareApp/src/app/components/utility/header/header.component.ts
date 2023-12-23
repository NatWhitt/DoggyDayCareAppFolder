import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UIService } from 'app/services/ui.service';
import { Subscription } from 'rxjs';

import { NgOptimizedImage } from '@angular/common';
import { User } from 'app/auth/user';
import { AccountService } from 'app/auth/account.service';
import { Staff } from 'app/models/staff';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  title: string = 'Doggy Day Care';
  @Input() inloggedInUser: Staff | undefined;
  
  loggedInStatus :boolean;

  ngOnInit(): void {}

  constructor(private router: Router, private accountService: AccountService) {
    this.loggedInStatus = true;
    
  }

  hasRoute(route: string) {
    return this.router.url == route;
  }

  logOut(){
    console.log('Logged out');
    this.loggedInStatus = false;
    localStorage.removeItem('user');
    this.accountService.logOut();

  }
}
