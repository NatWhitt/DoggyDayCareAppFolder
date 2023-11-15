import { HttpHeaders, HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookingWithRegistration } from 'app/models/booking-with-registration';
import { Registration } from 'app/models/registration';
import { RegistrationTake } from 'app/models/registration-take';
import { environment } from 'environments/environment';
import { throwError, Observable, map, catchError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private controller = 'Registration';

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

  getRegistration(registrationId: number) : Observable<Registration>{
    return this.http.get<Registration>(`${environment.apiUrl}/${this.controller}/${registrationId}`)
    .pipe(map((responseData:any)=>{
      let data: any;
      for(const key in responseData){
        if(responseData.hasOwnProperty(key)){
          if(key === "data"){
            data = (responseData as any)[key];
          }
        }
        return data;
      }
    } 
    ),
    catchError(this.handleError)
    );
  }

  getDogRegistrations(dogId: number, startDate: string, endDate: string) : Observable<Registration[]>{
    const params = new HttpParams()
    .set('dogId', dogId)
   .set('startDate', startDate)
   .set('endDate', endDate);
    return this.http.get<Registration[]>(`${environment.apiUrl}/${this.controller}/ByDateDog`, {params})
    .pipe(map(responseData =>{
      const data = [];
      for(const key in responseData){
        if(responseData.hasOwnProperty(key)){
          if(key== "data"){
            data.push(...((responseData as any)[key]))
          }
        }
      }
      return data
    }),
    catchError(this.handleError));
  } 
  getPossibleDogRegistrations(dogId: number, startDate: string, endDate: string) : Observable<BookingWithRegistration[]>{
    const params = new HttpParams()
    .set('dogId', dogId)
   .set('startDate', startDate)
   .set('endDate', endDate);
    return this.http.get<BookingWithRegistration[]>(`${environment.apiUrl}/${this.controller}/PossibleByDateDog`, {params})
    .pipe(map(responseData =>{
      const data = [];
      for(const key in responseData){
        if(responseData.hasOwnProperty(key)){
          if(key== "data"){
            data.push(...((responseData as any)[key]))
          }
        }
      }
      return data
    }),
    catchError(this.handleError));
  } 

  getPossibleRegistrationsSingleSession(sessionId: number) : Observable<BookingWithRegistration[]>{
    return this.http.get<BookingWithRegistration[]>(`${environment.apiUrl}/${this.controller}/PossibleSingleSession/${sessionId}`)
    .pipe(map(responseData =>{
      const data = [];
      for(const key in responseData){
        if(responseData.hasOwnProperty(key)){
          if(key== "data"){
            data.push(...((responseData as any)[key]))
          }
        }
      }
      return data
    }),
    catchError(this.handleError));
  } 

  takeRegistration(registration: RegistrationTake): Observable<Registration>{
    return this.http.post<Registration>(`${environment.apiUrl}/${this.controller}`,registration,httpOptions)
    .pipe(map((responseData:any)=>{
      let data: any;
      for(const key in responseData){
        if(responseData.hasOwnProperty(key)){
          if(key === "data"){
            data = (responseData as any)[key];
          }
        }
        return data;
      }
    } 
    ),
    catchError(this.handleError)
    );
  }

  deleteRegistration(deleteRegistrationId: number): Observable<Registration>{
    return this.http.delete<Registration>(`${environment.apiUrl}/${this.controller}/${deleteRegistrationId}`,httpOptions)
  }

  bulkCreateRegistration(bulkRegistration: RegistrationTake[]): Observable<Registration>{
    return this.http.post<Registration>(`${environment.apiUrl}/${this.controller}/BulkTake`,bulkRegistration,httpOptions)
  }



}
