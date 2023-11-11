import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Session } from 'app/models/session';
import { SessionBulk } from 'app/models/session-bulk';
import { SessionStaffBulk } from 'app/models/session-staff-bulk';
import { SessionStaffLinkDto } from 'app/models/session-staff-link-dto';
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
export class SessionService {
  private controller = 'Session';

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

  getSessionSettings(startDate: string, endDate: string) : Observable<Session[]>{
    const params = new HttpParams()
   .set('startDate', startDate)
   .set('endDate', endDate);
    return this.http.get<Session[]>(`${environment.apiUrl}/${this.controller}/Settings`, {params})
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
  getSessionDetails(startDate: string, endDate: string) : Observable<Session[]>{
    const params = new HttpParams()
   .set('startDate', startDate)
   .set('endDate', endDate);
    return this.http.get<Session[]>(`${environment.apiUrl}/${this.controller}/Details`, {params})
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
  getSession(id: number) : Observable<Session>{
    return this.http.get<Session>(`${environment.apiUrl}/${this.controller}/${id}`)
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
  getStaffSessionDetails(staffId: number, startDate: string, endDate: string) : Observable<Session[]>{
    const params = new HttpParams()
    .set('staffId', staffId)
   .set('startDate', startDate)
   .set('endDate', endDate);
    return this.http.get<Session[]>(`${environment.apiUrl}/${this.controller}/Staff`, {params})
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

  updateSession(session: Session): Observable<Session>{
    return this.http.put<Session>(`${environment.apiUrl}/${this.controller}`, session)
    .pipe(map((responseData)=>{
      let data:any;
      for(const key in responseData){
      if(responseData.hasOwnProperty(key)){
        if(key === "data"){
          data = (responseData as any)[key];
        }
        }
        return data;
      }
    }),
    catchError(this.handleError)
    );
  }

  createSession(session : Session): Observable<Session>{
    return this.http.post<Session>(`${environment.apiUrl}/${this.controller}`,session, httpOptions)
  }
  createBulkSessions(sessionBulk : SessionBulk): Observable<Session>{
    return this.http.post<Session>(`${environment.apiUrl}/${this.controller}/Bulk`,sessionBulk, httpOptions)
  }

  createStaffLink(sessionId: number, staffId: number): Observable<Session>{
    const params = new HttpParams()
    .set('sessionId', sessionId)
    .set('staffId', staffId);
    return this.http.post<Session>(`${environment.apiUrl}/${this.controller}/AddStaff`,params, httpOptions)
  }
  CreateBulkStaffLink(sessionStaffBulk : SessionStaffBulk): Observable<Session>{
    return this.http.post<Session>(`${environment.apiUrl}/${this.controller}/AddStaff/Bulk`,sessionStaffBulk, httpOptions)
  }

  deleteSession(session: Session) : Observable<Session>{
    return this.http.delete<Session>(`${environment.apiUrl}/${this.controller}/${session.id}`,httpOptions)
  }
  deleteSessionLink(deleteRequest: SessionStaffLinkDto) : Observable<Session>{
    
    return this.http.post<Session>(`${environment.apiUrl}/${this.controller}/Delete/StaffLink`, deleteRequest,httpOptions)
  }

  
}
