import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoryModel } from '../models/category-model';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  readonly URL = 'http://localhost:3000/api/category';

  constructor(private http: HttpClient) { }

  getCategory(){
    return this.http.get(`${this.URL}/getCategory`).toPromise();
  }

  getCategoryWithId(idCategory: string){
    return this.http.get(`${this.URL}/getCategoryById/${idCategory}`).toPromise();
  }

  postCategory(category: CategoryModel){
    return this.http.post(`${this.URL}/registerCategory`, category).toPromise();
  }

  updateCategory(idCategory: string, categoryModel: CategoryModel){
    return this.http.put(`${this.URL}/updateCategory/${idCategory}`, categoryModel).toPromise();
  }

  deleteCategory(idCategory: string){
    return this.http.delete(`${this.URL}/deleteCategory/${idCategory}`).toPromise();
  }
  
}
