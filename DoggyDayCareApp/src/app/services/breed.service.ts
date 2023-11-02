import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Breed } from 'app/models/breed';
import { map } from 'rxjs/operators'
import { environment } from 'environments/environment';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class BreedService {
  private url = 'Breed';




  constructor(private http:HttpClient) { }

  getBreeds() : Observable<Breed[]>{
  return  this.http.get<Breed[]>(`${environment.apiUrl}/${this.url}`)
  .pipe(map(responseData =>{
    const breeds = [];
      for(const key in responseData){
        if(responseData.hasOwnProperty(key)){
           if(key === "data")
           {
             breeds.push(...((responseData as any)[key]))
           }
        }
      }
      return breeds
    }));
  }

getBreed(id: number) : Observable<Breed>{
  return  this.http.get<Breed>(`${environment.apiUrl}/${this.url}/${id}`)
  .pipe(map((responseData:any)=>{
    let data: any;
    for(const key in responseData){
      if(responseData.hasOwnProperty(key)){
         if(key === "data")
         {
          data = (responseData as any)[key];
         }
      }
      return data;
    }
  }));
}
updateBreed(breed : Breed) :Observable<Breed>{
  return this.http.put<Breed>(`${environment.apiUrl}/${this.url}`, breed)  
  .pipe(map((responseData:any)=>{
    let data: any;
    for(const key in responseData){
      if(responseData.hasOwnProperty(key)){
         if(key === "data")
         {
          data = (responseData as any)[key];
         }
      }
      return data;
    }
  }));
}

deleteBreed(breed: Breed) : Observable<Breed>{
  return this.http.delete<Breed>(`${environment.apiUrl}/${this.url}/${breed.id}`, httpOptions);
}
createBreed(breed: Breed): Observable<Breed>{
  return this.http.post<Breed>(`${environment.apiUrl}/${this.url}`, breed, httpOptions);
}
}