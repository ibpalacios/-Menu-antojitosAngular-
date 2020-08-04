import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CymbalModel } from '../models/cymbal-model';


@Injectable({
  providedIn: 'root'
})
export class CymbalService {

  readonly URL = 'http://localhost:3000/api/cymbal';
  
  constructor(private http: HttpClient) { }

  getCymbalByCategory(idCategory: string){
    return this.http.get(`${this.URL}/getAllCymbalWhereId/${idCategory}`).toPromise();
  }

  getCymbalWithId(idCymbal: string){
    return this.http.get(`${this.URL}/getCymbalById/${idCymbal}`).toPromise();
  }

  postCymbal(cymbal: CymbalModel){
    return this.http.post(`${this.URL}/registerCymbal`, cymbal).toPromise();
  }

  updateCymbal(idCymbal: string, cymbalModel: CymbalModel){
    return this.http.put(`${this.URL}/updateCymbal/${idCymbal}`, cymbalModel).toPromise();
  }
}
