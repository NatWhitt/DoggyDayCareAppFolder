import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dog } from 'app/models/dog';
import { ContactsService } from 'app/services/contacts.service';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.css']
})
export class CreateContactComponent {
  @Output() statusEvent : EventEmitter<string> = new EventEmitter();
  @Input() selectedDog!: Dog;

  title  = '';
forename  ='';
surname  ='';
email  ='';
phoneNumber  ='';
contactPriority = 1;


  constructor(private contactService: ContactsService, private route: ActivatedRoute){

  }
  ngOnInit():void {
    }
  onSubmit(){
    if(!this.forename || !this.surname){
      alert('Please enter a valid entry');
      return;
    }
    const newContact={
      title : this.title,
  forename  : this.forename,
  surname  : this.surname,
  email  : this.email,
  phoneNumber  : this.phoneNumber,
  contactPriority : this.contactPriority,
  dog : this.selectedDog
    }

  
    this.contactService.createContact(newContact).subscribe();
    
    this.statusEvent.emit('Created');

    this.title ='';
    this.forename ='';
    this.surname ='';
    this.email ='';
    this.phoneNumber='';
    this.contactPriority=0;
  }

  cancel(){
    this.statusEvent.emit('Canceled');
    this.title ='';
    this.forename ='';
    this.surname ='';
    this.email ='';
    this.phoneNumber='';
    this.contactPriority=0;
  }

  
}
