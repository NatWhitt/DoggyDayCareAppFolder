import { HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dog } from 'app/models/dog';
import { DogPhoto } from 'app/models/dog-photo';
import { UploadDogPhoto } from 'app/models/upload-dog-photo';
import { environment } from 'environments/environment';
import { Observable, catchError, map, of, throwError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class DogService {
  private controller = 'Dog';

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

  getDogs(): Observable<Dog[]>{
    return this.http.get<Dog[]>(`${environment.apiUrl}/${this.controller}`)
    .pipe(map(responseData =>{
      const dogs = [];
      for(const key in responseData){
        if(responseData.hasOwnProperty(key)){
          if(key== "data"){
            dogs.push(...((responseData as any)[key]))
          }
        }
      }
      return dogs
    }),
    catchError(this.handleError));
  }

  getDog(id: number) : Observable<Dog>{
    return this.http.get<Dog>(`${environment.apiUrl}/${this.controller}/${id}`)
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

  updateDog(dog : Dog) : Observable<Dog>{
    return this.http.put<Dog>(`${environment.apiUrl}/${this.controller}`, dog)
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
  createDog(dog : Dog): Observable<Dog>{
    return this.http.post<Dog>(`${environment.apiUrl}/${this.controller}`,dog, httpOptions)
  }
  deleteDog(dog: Dog) : Observable<Dog>{
    return this.http.delete<Dog>(`${environment.apiUrl}/${this.controller}/${dog.id}`,httpOptions)
  }
  getDogPhoto(id: number) : Observable<DogPhoto>{
    return this.http.get<DogPhoto>(`${environment.apiUrl}/${this.controller}/Photo/${id}`)
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

  // file upload swapping to uploading data with dog ID
  // uploadDogPhoto(file: File): Observable<HttpEvent<any>> {
  //   const formData: FormData = new FormData();

  //   formData.append('file', file);

  //   const req = new HttpRequest('POST', `${environment.apiUrl}/${this.controller}/Photo`, formData, {
  //     reportProgress: true,
  //     responseType: 'json',
  //   });

  //   return this.http.request(req);
  // }
  uploadDogPhoto(newPhoto : UploadDogPhoto): Observable<UploadDogPhoto>{
    return this.http.post<UploadDogPhoto>(`${environment.apiUrl}/${this.controller}/Photo`,newPhoto, httpOptions).pipe(
      catchError((error) => {
        console.error('API Error:', error);
        return throwError(error);
      })
    );
  }
  
}
