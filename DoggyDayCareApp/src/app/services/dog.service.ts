import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dog } from 'app/models/dog';
import { Observable, map } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class DogService {
  private url = 'Dog';

  constructor(private http:HttpClient) { }

  getDogs(): Observable<Dog[]>{
    return this.http.get<Dog[]>(`$enironment.apiUrl}/${this.url}`)
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
    }));
  }
}
