import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BreedComponent } from './components/breed/breed.component';

const routes: Routes = [
  {path: '', component: BreedComponent},
  {path: 'breed', component: BreedComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
