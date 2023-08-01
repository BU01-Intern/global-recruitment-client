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
    private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.getDataCategory();
    this.getDataCategoryType();
  }

  public page = 1;
  public pageSize = 5;

  categoryTypes: CategoryType[] = [];
  categories: Category[] = []
  filterCategories: Category[] = this.categories;

  filterCategory(code: string, name: string) {
    if (code === "" && name === "") {
      this.filterCategories = this.categories;
    }
    else {
        this.filterCategories = this.categories.filter(cats => {
        cats?.name.toLowerCase().includes(name.toLowerCase()) && cats?.code.toLowerCase().includes(code.toLowerCase())
        console.log(cats)
      })
    }
    console.log(this.filterCategories)
    console.log("clicked")
    console.log(code + " " + name)
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
      // this.searchCategories();
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
}

