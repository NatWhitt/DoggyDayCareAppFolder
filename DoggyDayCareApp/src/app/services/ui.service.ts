import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UIService {
  private showAdd: boolean = false;
  private subject = new Subject<any>();
  
  constructor() { }

  toggleAdd(): void{
    this.showAdd = !this.showAdd;
    this.subject.next(this.showAdd);
    

  }
  onToggle(): Observable<any>{
    console.log(this.subject);
    return this.subject.asObservable();    
  }
}
