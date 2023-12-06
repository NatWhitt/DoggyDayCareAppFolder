import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BreedComponent } from './components/breed/breed.component';
import { DogComponent } from './components/dog/dog-list/dog-list.component';
import { DogProfileComponent } from './components/dog/dog-profile/dog-profile.component';
import { CreateDogComponent } from './components/dog/create-dog/create-dog.component';
import { StaffListComponent } from './components/staff/staff-list/staff-list.component';
import { StaffProfileComponent } from './components/staff/staff-profile/staff-profile.component';
import { CreateStaffComponent } from './components/staff/create-staff/create-staff.component';
import { SessionListComponent } from './components/session/session-list/session-list.component';
import { CreateSessionComponent } from './components/session/create-session/create-session.component';
import { CreateBulkSessionsComponent } from './components/session/create-bulk-sessions/create-bulk-sessions.component';
import { CreateBulkStaffLinkComponent } from './components/session/create-bulk-staff-link/create-bulk-staff-link.component';
import { TakeRegistrationComponent } from './components/registration/take-registration/take-registration.component';

const routes: Routes = [
  {path: '', component: TakeRegistrationComponent},
  {path: 'breeds', component: BreedComponent},
  {path: 'dog-list', component: DogComponent},
  {path: 'dog-profile/:id', component:DogProfileComponent},
  {path: 'create-dog', component:CreateDogComponent},
  {path: 'staff-list', component:StaffListComponent},
  {path: 'staff-profile/:id', component:StaffProfileComponent},
  {path: 'create-staff', component:CreateStaffComponent},
  {path: 'session-list', component:SessionListComponent},
  {path: 'create-session', component:CreateSessionComponent},
  {path: 'create-bulk-session', component:CreateBulkSessionsComponent},
  {path: 'create-bulk-staff-link', component:CreateBulkStaffLinkComponent},
  {path: 'take-registration', component:TakeRegistrationComponent},
  {path: '**', component: TakeRegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
