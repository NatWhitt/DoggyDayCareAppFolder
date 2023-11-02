import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component } from '@angular/core';
import { Dog } from 'app/models/dog';
import { DogService } from 'app/services/dog.service';
import { BreedService } from 'app/services/breed.service';
import { Breed } from 'app/models/breed';

@Component({
  selector: 'app-dog-profile',
  templateUrl: './dog-profile.component.html',
  styleUrls: ['./dog-profile.component.css']
})
export class DogProfileComponent {
  dog : Dog | undefined;
  breeds : Breed[] = [];
  edit :boolean = false;
  dogIdFromRoute : number | undefined;
  errorMessage = '';
  errorStatus = '';


  constructor(private dogService: DogService, private route: ActivatedRoute, private breedService: BreedService){}
  ngOnInit():void {
    const routeParams = this.route.snapshot.paramMap;
    this.dogIdFromRoute = Number(routeParams.get('id'));
    // this.dogService.getDog(this.dogIdFromRoute).subscribe((dog) => this.dog = dog);
    // this.dogService.getDog(this.dogIdFromRoute).subscribe((dog:Dog) => this.dog = dog);

   this.dogService.getDog(this.dogIdFromRoute).subscribe({
      next: dog => {
        this.dog = dog;
      },
      error: err => {
        this.errorStatus = err.status
        this.errorMessage = err.error 
      }
    });
    this.breedService.getBreeds().subscribe((breeds) => this.breeds = breeds);
  }
  enableEdit(){
    this.edit = !this.edit;
  }
  editDog(selectedDog:Dog){
    this.dog = selectedDog;  
    this.dogService.updateDog(selectedDog).subscribe((dog) => selectedDog = dog)
    this.edit = false;
  }


}
