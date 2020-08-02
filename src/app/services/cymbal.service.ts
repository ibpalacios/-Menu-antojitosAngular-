import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CymbalModel } from '../models/cymbal-model';


@Injectable({
  providedIn: 'root'
})
export class CymbalService {

  readonly URL = 'http://localhost:3000/api/cymbal';
  
  constructor(private http: HttpClient) { }

  getCymbal(){
    return this.http.get(`${this.URL}/getCymbal`).toPromise();
  }
}
