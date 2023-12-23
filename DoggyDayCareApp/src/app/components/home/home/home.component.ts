import { Component, Input, Output } from '@angular/core';
import { Staff } from 'app/models/staff';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  @Input() inloggedInUser!: Staff;
  @Output() outloggedInUser!: Staff;
  ngOnInit():void {    
    this.outloggedInUser =this.inloggedInUser; 
  }
}
