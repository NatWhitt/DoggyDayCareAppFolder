import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from 'app/models/contact';
import { ContactLink } from 'app/models/contact-link';
import { environment } from 'environments/environment';
import { Observable, catchError, map, throwError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})


export class ContactsService {
  private controller = 'Contact';
  constructor(private http:HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => error);
  }

  getContacts(): Observable<Contact[]>{
    return this.http.get<Contact[]>(`${environment.apiUrl}/${this.controller}`)
    .pipe(map(responseData =>{
      const contacts: Contact[] = [];
      for(const key in responseData){
        if(key =="data"){
          contacts.push(...((responseData as any)[key]))
        }
      }
      return contacts
    }),
    catchError(this.handleError));
  }
  getcontact(id: number): Observable<Contact>{
  return this.http.get(`${environment.apiUrl}/${this.controller}/${id}`)
  .pipe(map((responseData:any)=>{
    let data:any;
    for(const key in responseData){
      if(responseData.hasOwnProperty){
        if(key === "data"){
          data = (responseData as any)[key];
        }
      }
      return data
    }
  }
  ),
  catchError(this.handleError)
  );
}


updateContact(contact: Contact) : Observable<Contact>{
  return this.http.put<Contact>(`${environment.apiUrl}/${this.controller}`,contact)
  .pipe(map((responseData) =>
  {
    let data:any;
    for(const key in responseData){
      if(key === "data"){
        data = (responseData as any)[key];
      }
      return data;
    }
  }),
  catchError(this.handleError));
}
createContact(contact: Contact): Observable<Contact>{
  return this.http.post<Contact>(`${environment.apiUrl}/${this.controller}`, contact,httpOptions)  
}
deleteContact(contact: Contact) : Observable<Contact>{
  return this.http.delete<Contact>(`${environment.apiUrl}/${this.controller}/${contact.id}`,httpOptions)
}

getAllDogsOneContact(contactId: number): Observable<Contact[]>{
  return this.http.get<Contact[]>(`${environment.apiUrl}/${this.controller}/AllDogsOneContact/${contactId}`)
  .pipe(map(responseData =>{
    const contacts = [];
    for(const key in responseData){
      if(key =="data"){
        contacts.push(...((responseData as any)[key]))
      }
    }
    return contacts
  }),
  catchError(this.handleError));
}
getsingleDogAllContacts(dogId: number): Observable<Contact[]>{
  return this.http.get<Contact[]>(`${environment.apiUrl}/${this.controller}/SingleDogAllContacts/${dogId}`)
  .pipe(map(responseData =>{
    const contacts = [];
    for(const key in responseData){
      if(key =="data"){
        contacts.push(...((responseData as any)[key]))
      }
    }
    return contacts
  }),
  catchError(this.handleError));
}
createContactLink(contactLink: ContactLink): Observable<Contact>{
  return this.http.post<Contact>(`${environment.apiUrl}/${this.controller}/Link`, contactLink,httpOptions)  
}
deleteContactLink(contactLink: ContactLink) : Observable<Contact>{
  return this.http.delete<Contact>(`${environment.apiUrl}/${this.controller}/Link`,httpOptions)
}

}
