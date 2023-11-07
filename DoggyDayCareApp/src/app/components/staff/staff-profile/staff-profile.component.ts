import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Staff } from 'app/models/staff';
import { StaffService } from 'app/services/staff.service';

@Component({
  selector: 'app-staff-profile',
  templateUrl: './staff-profile.component.html',
  styleUrls: ['./staff-profile.component.css']
})
export class StaffProfileComponent {
  staff : Staff | undefined;

  staffIdFromRoute: number | undefined;
  errorMessage = '';
  errorStatus = '';
  view = 'core';

@Output() currentStaff: EventEmitter<Staff> = new EventEmitter();

constructor(private staffService: StaffService, private route: ActivatedRoute){}
ngOnInit():void {
  const routeParams = this.route.snapshot.paramMap;
  this.staffIdFromRoute = Number(routeParams.get('id'));
 this.staffService.getStaff(this.staffIdFromRoute).subscribe({
    next: data => {
      this.staff = data;
    },
    error: err => {
      this.errorStatus = err.status
      this.errorMessage = err.error 
    }
  });
}
setView(page:string){
  this.view = page;
}

}
