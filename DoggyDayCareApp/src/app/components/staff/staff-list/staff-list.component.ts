import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Staff } from 'app/models/staff';
import { StaffService } from 'app/services/staff.service';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.css']
})
export class StaffListComponent {
staffs: Staff [] = [];

showDeleteOptions: boolean = false;
delete: boolean = false;
create: boolean = false;

constructor( private staffService:StaffService, private route: ActivatedRoute){}
ngOnInit():void{
  this.staffService.getStaffsByStatus(1).subscribe((staffs)=> this.staffs = staffs)
}
showDelete(){
  this.showDeleteOptions = !this.showDeleteOptions;
}
deleteButton(){
  this.delete = !this.delete;
}

deleteStaff(dStaff: Staff){
  this.staffService.deleteStaff(dStaff).subscribe(() => this.staffs = this.staffs.filter(s => s.id !== dStaff.id))
}


}
