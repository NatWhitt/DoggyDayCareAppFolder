import { HttpHeaders, HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Booking } from 'app/models/booking';
import { BookingBulk } from 'app/models/booking-bulk';
import { BookingDog } from 'app/models/booking-dog';
import { BookingSession } from 'app/models/booking-session';
import { Dog } from 'app/models/dog';
import { Session } from 'app/models/session';
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
export class BookingService {
  private controller = 'Booking';

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

  getBookings(startDate: string, endDate: string) : Observable<Booking[]>{
    const params = new HttpParams()
   .set('startDate', startDate)
   .set('endDate', endDate);
    return this.http.get<Booking[]>(`${environment.apiUrl}/${this.controller}`, {params})
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
  getBookingsSingleSession(sessionId: number) : Observable<Dog[]>{
    return this.http.get<Dog[]>(`${environment.apiUrl}/${this.controller}/Session/${sessionId}`)
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
  getDogBookings(dogId: number, startDate: string, endDate: string) : Observable<Session[]>{
    const params = new HttpParams()
    .set('dogId', dogId)
   .set('startDate', startDate)
   .set('endDate', endDate);
    return this.http.get<Session[]>(`${environment.apiUrl}/${this.controller}/Dog`, {params})
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
  GetAllAvailableSessionsForDog(sessionId: number) : Observable<Session[]>{
    return this.http.get<Session[]>(`${environment.apiUrl}/${this.controller}/Dog/Available/${sessionId}`)
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

  getAllAvailableDogsForSingleSession(sessionId: number) : Observable<Dog[]>{
    return this.http.get<Dog[]>(`${environment.apiUrl}/${this.controller}/Session/Available/${sessionId}`)
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
  createBooking(booking: Booking): Observable<Session>{
    return this.http.post<Session>(`${environment.apiUrl}/${this.controller}`,booking,httpOptions)
  }
  createBulkBooking(bookingBulk: BookingBulk): Observable<Session>{
    return this.http.post<Session>(`${environment.apiUrl}/${this.controller}/Bulk`,bookingBulk,httpOptions)
  }
  deleteBooking(deleteBooking: Booking) : Observable<Session>{

    return this.http.post<Session>(`${environment.apiUrl}/${this.controller}/Delete`,deleteBooking,httpOptions)
  }

}
