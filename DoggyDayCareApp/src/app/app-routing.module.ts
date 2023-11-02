import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BreedComponent } from './components/breed/breed.component';
import { DogComponent } from './components/dog components/dog-list/dog-list.component';
import { DogProfileComponent } from './components/dog components/dog-profile/dog-profile.component';
import { CreateDogComponent } from './components/dog components/create-dog/create-dog.component';

const routes: Routes = [
  {path: '', component: DogComponent},
  {path: 'breeds', component: BreedComponent},
  {path: 'dog-list', component: DogComponent},
  {path: 'dog-profile/:id', component:DogProfileComponent},
  {path: 'create-dog', component:CreateDogComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
