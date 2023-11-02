import { Component, EventEmitter, Output } from '@angular/core';
import { Dog } from 'app/models/dog';
import { Breed } from 'app/models/breed';
import { getLocaleDateFormat } from '@angular/common';
import { Subscription } from 'rxjs';
import { BreedService } from 'app/services/breed.service';
import { UIService } from 'app/services/ui.service';
import { DatePipe } from '@angular/common';
import { DogService } from 'app/services/dog.service';


@Component({
  selector: 'app-create-dog',
  templateUrl: './create-dog.component.html',
  styleUrls: ['./create-dog.component.css']
})
export class CreateDogComponent {
  breeds : Breed[] = [];


  forename : string;
  surname : string;
  breed : Breed;
  description : string;
  dob: Date;
  startDate: Date;
  systemStatus:number;

  showAddDog: boolean = false;
  // subscription: Subscription;

  constructor (private dogService: DogService, private breedService: BreedService, private datePipe: DatePipe) {
    this.forename = '';
    this.surname = '';
    this.description = '';
    this.dob = new Date();
    this.breed = new Breed();
    this.startDate = new Date();
    this.systemStatus =1;

    this.breedService.getBreeds().subscribe((breeds) => this.breeds = breeds);
  // this.subscription = this.uiService.onToggle().subscribe((value:boolean) => this.showAddDog = value);
  }
  get formattedDate() {
    return this.datePipe.transform(this.dob, 'dd-MM-yyyy');
    return this.datePipe.transform(this.startDate, 'dd-MM-yyyy');
  }
  
  onSubmit(){
    if(!this.forename || !this.surname){
      alert('Please enter a valid entry');
      return;
    }
    const newDog={
      forename: this.forename,
      surname: this.surname,      
      breed : this.breed,
      description: this.description,
      dob: this.dob,
      startDate: this.startDate,
      systemStatus: this.systemStatus,
    }

    this.dogService.createDog(newDog).subscribe();

    this.forename = '';
    this.surname = '';
    this.breed = new Breed();
    this.description = '';
    this.dob = new Date();
    this.startDate = new Date();
    this.systemStatus =1;

  }
  
}
