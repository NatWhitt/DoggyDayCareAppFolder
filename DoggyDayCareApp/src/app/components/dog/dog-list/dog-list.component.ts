import { Component, EventEmitter, Output } from '@angular/core';
import { Dog } from 'app/models/dog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DogService } from 'app/services/dog.service';

@Component({
  selector: 'app-dog-list',
  templateUrl: './dog-list.component.html',
  styleUrls: ['./dog-list.component.css']
})
export class DogComponent {
  dogs: Dog[] = [];

  showDeleteOptions: boolean = false;
  delete: boolean = false;
  create: boolean = false;

  constructor(private dogService: DogService, private route: ActivatedRoute){}
  ngOnInit():void {
  this.dogService.getDogs().subscribe((dogs) => this.dogs = dogs);
  }

showDelete(){
  this.showDeleteOptions = !this.showDeleteOptions;
}
deleteButton(){
  this.delete = !this.delete;
}

deleteDog(deleteDog: Dog){
  this.dogService.deleteDog(deleteDog).subscribe(() => this.dogs = this.dogs.filter(d => d.id !== deleteDog.id))
  this.delete = false;
}
}
