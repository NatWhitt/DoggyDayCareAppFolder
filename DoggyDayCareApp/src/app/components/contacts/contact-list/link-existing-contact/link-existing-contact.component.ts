import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contact } from 'app/models/contact';
import { ContactLink } from 'app/models/contact-link';
import { Dog } from 'app/models/dog';
import { ContactsService } from 'app/services/contacts.service';

@Component({
  selector: 'app-link-existing-contact',
  templateUrl: './link-existing-contact.component.html',
  styleUrls: ['./link-existing-contact.component.css']
})
export class LinkExistingContactComponent {
  contacts : Contact[] = [];
  @Input() selectedDog!: Dog;

  
  @Output() statusEvent : EventEmitter<string> = new EventEmitter();

  selectedContact! : Contact;
  dogID: any;
  contactID: any;



  constructor(private contactService: ContactsService, private route: ActivatedRoute){
  }
ngOnInit():void {
  this.dogID =  this.selectedDog.id;
  // change this to exclude existing contacts.
this.contactService.getContacts().subscribe(
  (contacts) => this.contacts = contacts);
}

onSubmit(){
  if(!this.selectedContact){
    alert('Please select a contact');
    return;
  }
  this.contactID = this.selectedContact.id;
  const newLink ={
    contactId : this.contactID,
    dogId : this.dogID,
  }
  this.contactService.createContactLink(newLink).subscribe();
  this.statusEvent.emit('Created');
}
cancel(){
  this.statusEvent.emit('Canceled');
}

}
