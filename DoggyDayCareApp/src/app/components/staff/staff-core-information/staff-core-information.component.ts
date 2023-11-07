import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Staff } from 'app/models/staff';
import { StaffService } from 'app/services/staff.service';

@Component({
  selector: 'app-staff-core-information',
  templateUrl: './staff-core-information.component.html',
  styleUrls: ['./staff-core-information.component.css']
})
export class StaffCoreInformationComponent {

  @Input() staff!: Staff;
  edit: boolean = false;

  constructor(private staffServices: StaffService, private route: ActivatedRoute, private datePipe:DatePipe){}

  ngOnInit():void{

  }
  get formattedDate() {
    return this.datePipe.transform(this.staff.startDate, 'dd-MM-yyyy');
  }

  enableEdit(){
    this.edit = !this.edit;
  }
  editStaff(selectedStaff:Staff){
    this.staff = selectedStaff;  
    this.staffServices.updateStaff(selectedStaff).subscribe((staff) => selectedStaff = staff)
    this.edit = false;
  }


}
