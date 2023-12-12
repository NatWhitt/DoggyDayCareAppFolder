  import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UIService } from 'app/services/ui.service';
import { Subscription } from 'rxjs';

import { NgOptimizedImage } from '@angular/common'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  title: string = 'Doggy Day Care';
  showAddTask: boolean;
  subscription: Subscription;

  ngOnInit(): void{}


  constructor ( private uiService: UIService, private router: Router) {
  this.showAddTask = false;
  this.subscription = this.uiService
  .onToggle()
  .subscribe((value) => (this.showAddTask = value)); 
  }


  hasRoute(route: string){
    return this.router.url == route;
  }
}