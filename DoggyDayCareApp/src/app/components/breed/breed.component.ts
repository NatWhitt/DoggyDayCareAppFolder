import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Breed } from 'app/models/breed';
import { BreedService } from 'app/services/breed.service';

@Component({
  selector: 'app-breed',
  templateUrl: './breed.component.html',
  styleUrls: ['./breed.component.css']
})
export class BreedComponent {
  // @Input() breed?: Breed;
  newBreedName = '';
  breeds: Breed[] = [];
  edit: boolean = false;
  delete: boolean = false;
  create: boolean = false;


  constructor(private breedService: BreedService){}
  ngOnInit():void {
  this.breedService.getBreeds().subscribe((breeds) => this.breeds = breeds);
  }

  editButton(){
    this.edit = true;
  }
  deleteButton(){
    this.delete = true;
  }
  cancel(){
    this.edit = false;
    this.delete = false;
  }

  editBreed(selectedBreed:Breed){
    this.breedService.updateBreed(selectedBreed).subscribe((breed) => selectedBreed = breed)
    this.edit = false;
  }

  deleteBreed(deleteBreed:Breed){
    this.breedService.deleteBreed(deleteBreed).subscribe(() => this.breeds = this.breeds.filter(b => b.id !== deleteBreed.id));
    this.delete = false;
  }

  createButton(){
    this.create = !this.create;
    console.log(this.create);
    
  }
  createBreed(){
      if(!this.newBreedName){
        alert('Please add a task');
        return;
      }
      const newBreed ={
        name: this.newBreedName
      }
    this.breedService.createBreed(newBreed).subscribe();
    this.newBreedName ='';
    this.create = !this.create;
  }

}
