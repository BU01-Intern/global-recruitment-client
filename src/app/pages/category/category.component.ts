import { Component, OnInit } from '@angular/core';
import { CategoryType } from './models/category-type.model';
import { HttpClient } from '@angular/common/http';
import { CategoryService } from './category.service';
import { Category } from './models/category.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  constructor(
    private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getDataCategory();
    this.getDataCategoryType();
  }

  public page = 1;
  public pageSize = 5;

  categoryTypes: CategoryType[] = [];
  categories: Category[] = []
  filterCategories: Category[] = this.categories;

  // Tìm kiếm
  searchCategoryName: string = '';
  searchCategoryCode: string = '';
  searchValidity: string = 'all';
  filteredCategories: any[] = [];
  // ...

  searchCategories() {
    // Lọc danh mục dựa trên tên và mã danh mục
    const filteredCategories = this.categories.filter((category) => {
      const nameMatch = category.name.toLowerCase().includes(this.searchCategoryName.toLowerCase());
      const codeMatch = category.code.toLowerCase().includes(this.searchCategoryCode.toLowerCase());
      return nameMatch || codeMatch;
    });

    // Lọc danh mục dựa trên trạng thái hiệu lực
    const now = new Date();
    if (this.searchValidity === 'valid') {
      this.filteredCategories = filteredCategories.filter((category) => new Date(category.expired_date) >= now);
    } else if (this.searchValidity === 'expired') {
      this.filteredCategories = filteredCategories.filter((category) => new Date(category.expired_date) < now);
    } else {
      this.filteredCategories = filteredCategories;
    }
  }

  getDataCategoryType() {
    this.categoryService.getAllCategoryTypes().subscribe(
      (data) => {
        this.categoryTypes = data;
      },
      (error) => {
        console.error('Err call API category type', error);
      }
    );
  }

  getDataCategory() {
    this.categoryService.getAllCategory().subscribe(data => {
      this.categories = data;
      this.searchCategories();
    });
  }

  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id).subscribe(
      () => {
        console.log('Xóa thành công');
        this.getDataCategory();

      },
      (error) => {
        console.error('Lỗi khi xóa', error);
        this.getDataCategory();
      }
    );
  }

  deleteCategoryType(id: number) {
    this.categoryService.deleteCategoryType(id).subscribe(
      () => {
        console.log('Xóa thành công');
        this.getDataCategoryType();
      },
      (error) => {
        console.error('Lỗi khi xóa', error);
        this.getDataCategoryType();
      }
    );
  }
}

