import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Breed } from 'app/models/breed';
import { Dog } from 'app/models/dog';
import { BreedService } from 'app/services/breed.service';
import { DogService } from 'app/services/dog.service';

@Component({
  selector: 'app-dog-core-information',
  templateUrl: './dog-core-information.component.html',
  styleUrls: ['./dog-core-information.component.css']
})
export class DogCoreInformationComponent {

  @Input() dog!: Dog;
  breeds : Breed[] = [];
  edit :boolean = false;

  constructor(private dogService: DogService, private route: ActivatedRoute, private breedService: BreedService, private datePipe: DatePipe){}

  ngOnInit():void{
    this.breedService.getBreeds().subscribe((breeds) => this.breeds = breeds);
    this.datePipe.transform(this.dog.dob, 'dd-MM-yyyy');
    this.datePipe.transform(this.dog.startDate, 'dd-MM-yyyy');
  }
  get formattedDate() {
    return this.datePipe.transform(this.dog.dob, 'dd-MM-yyyy');
    return this.datePipe.transform(this.dog.startDate, 'dd-MM-yyyy');
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
