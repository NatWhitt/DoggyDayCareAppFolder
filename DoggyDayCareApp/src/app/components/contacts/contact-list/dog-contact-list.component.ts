import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contact } from 'app/models/contact';
import { Dog } from 'app/models/dog';
import { ContactsService } from 'app/services/contacts.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './dog-contact-list.component.html',
  styleUrls: ['./dog-contact-list.component.css']
})
export class DogContactListComponent {
contacts : Contact[] = [];
@Input() currentDog!: Dog;
@Output() selectedDog: EventEmitter<Dog> = new EventEmitter();


dogId = 0;



showDeleteOptions: boolean = false;
delete: boolean = false;
create: boolean = false;

constructor(private contactService: ContactsService, private route: ActivatedRoute){}
ngOnInit():void {
this.contactService.getsingleDogAllContacts(this.currentDog.id ?? 0).subscribe(
  (contacts) => this.contacts = contacts);
}
showDelete(){
  this.showDeleteOptions = !this.showDeleteOptions;
}
deleteButton(){
  this.delete = !this.delete;
}

createButton(){
  this.create = !this.create;
}

deleteContact(deleteContact: Contact){
  // this.dogService.deleteDog(deleteDog).subscribe(() => this.dogs = this.dogs.filter(d => d.id !== deleteDog.id))
  this.delete = false;
}

handleCreateNewForm(formStatus: string){
  switch(formStatus){
    case 'Canceled':
      this.create = false;
      break;
    case 'Created':
      this.contactService.getsingleDogAllContacts(this.currentDog.id ?? 0).subscribe(
        (contacts) => this.contacts = contacts);
      this.create = false;
      break;
  }

}
}
