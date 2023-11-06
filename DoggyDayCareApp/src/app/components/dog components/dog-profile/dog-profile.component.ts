import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, EventEmitter, Output } from '@angular/core';
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

  dogIdFromRoute : number | undefined;
  errorMessage = '';
  errorStatus = '';
  view = 'core';

  @Output() currentDog: EventEmitter<Dog> = new EventEmitter();


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
  }
  setView(page:string){
    this.view = page;
  }

  
}
