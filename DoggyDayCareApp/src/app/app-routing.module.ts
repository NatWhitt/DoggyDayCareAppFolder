import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BreedComponent } from './components/breed/breed.component';
import { DogComponent } from './components/dog components/dog-list/dog-list.component';
import { DogProfileComponent } from './components/dog components/dog-profile/dog-profile.component';
import { CreateDogComponent } from './components/dog components/create-dog/create-dog.component';
import { StaffListComponent } from './components/staff/staff-list/staff-list.component';
import { StaffProfileComponent } from './components/staff/staff-profile/staff-profile.component';
import { CreateStaffComponent } from './components/staff/create-staff/create-staff.component';

const routes: Routes = [
  {path: '', component: StaffListComponent},
  {path: 'breeds', component: BreedComponent},
  {path: 'dog-list', component: DogComponent},
  {path: 'dog-profile/:id', component:DogProfileComponent},
  {path: 'create-dog', component:CreateDogComponent},
  {path: 'staff-list', component:StaffListComponent},
  {path: 'staff-profile/:id', component:StaffProfileComponent},
  {path: 'create-staff', component:CreateStaffComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
