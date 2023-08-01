import { Component } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
  public page = 1;
  public pageSize = 5;
  categoryTypes: CategoryType[] = [
    { name: 'Category 1', code: 'cat1' },
    { name: 'Category 2', code: 'cat2' },
    { name: 'Category 3', code: 'cat3' },
  ]

  categories: Category[] = [
    { name: 'Categor d đ  d d dy 1', code: 'cat1', effectiveDate: null, expiriedDate: null },
    { name: 'Category 2', code: 'cat2', effectiveDate: null, expiriedDate: null },
    { name: 'Category 3', code: 'cat3', effectiveDate: null, expiriedDate: null },
    { name: 'Category 4', code: 'cat4', effectiveDate: null, expiriedDate: null },
    { name: 'Category 5', code: 'cat5', effectiveDate: null, expiriedDate: null },
  ]

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
}

class CategoryType {
  name!: string;
  code!: string;
}

class Category {
  name!: string;
  code!: string;
  effectiveDate: Date | null = null;
  expiriedDate: Date | null = null;
}
