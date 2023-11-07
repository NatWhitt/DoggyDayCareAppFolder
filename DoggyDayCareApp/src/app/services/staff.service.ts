import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Staff } from 'app/models/staff';
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



export class StaffService {
  private controller = 'Staff';
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

  getStaffsByStatus(type: number): Observable<Staff[]>{
    return this.http.get<Staff[]>(`${environment.apiUrl}/${this.controller}/ByStatus/${type}`)
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

  getStaff(id: number) : Observable<Staff>{
    return this.http.get<Staff>(`${environment.apiUrl}/${this.controller}/${id}`)
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

  updateStaff(staff: Staff) : Observable<Staff>{
    return this.http.put<Staff>(`${environment.apiUrl}/${this.controller}`, staff)
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
    }),
    catchError(this.handleError)
    );
  }
  createStaff(staff : Staff): Observable<Staff>{
    return this.http.post<Staff>(`${environment.apiUrl}/${this.controller}`,staff, httpOptions)
  }
  deleteStaff(staff: Staff) : Observable<Staff>{
    return this.http.delete<Staff>(`${environment.apiUrl}/${this.controller}/${staff.id}`,httpOptions)
  }

}
  



