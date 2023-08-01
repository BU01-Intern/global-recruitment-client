import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoryType } from './models/category-type.model';
import { Observable } from 'rxjs';
import { Category } from './models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getAllCategoryTypes(): Observable<CategoryType[]> {
    return this.http.get<CategoryType[]>(`http://localhost:8080/api/v2/category_type`);
  }

  getAllCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(`http://localhost:8080/api/v1/category`);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/api/v1/category/${id}`);
  }

  deleteCategoryType(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/api/v2/category_type/${id}`);
  }
}
