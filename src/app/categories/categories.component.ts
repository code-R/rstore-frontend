import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { CategoryService } from './../services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  readonly AddAction = 'ADD';
  readonly UpdateAction = 'UPDATE';

  locationId: string;
  departmentId: string;
  categories: any;
  categoryForm: FormGroup;
  formAction: string = this.AddAction;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
  ) {
      this.activatedRoute.params.subscribe(
        params => {
          this.locationId = params['locationId'];
          this.departmentId = params['departmentId'];
          this.categoryService.locationId = this.locationId;
          this.categoryService.departmentId = this.departmentId;
        }
      );

      this.categoryForm = formBuilder.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        id: '',
      })
  }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.index().subscribe(res => {
      this.categories = res;
      this.categoryForm.reset();
      this.formAction = this.AddAction;
    });
  }

  addCategory() {
    this.categoryService.create(
      this.categoryForm.value).subscribe(
        res => {
          this.getCategories();
    });
  }

  updateCategory() {
    this.categoryService.update(
      this.categoryForm.value).subscribe(
        res => {
          this.getCategories();
    });
  }

  submitAction() {
    if (this.categoryForm.value.id) {
      this.updateCategory();
    } else {
      this.addCategory();
    }
  }

  deleteCategory(categoryId) {
    this.categoryService.destroy(categoryId).subscribe(res => {
      this.getCategories();
    });
  }

  editCategory(category) {
    delete category.created_at;
    delete category.location_id;
    delete category.department_id;
    this.formAction = this.UpdateAction;
    this.categoryForm.setValue(category);
  }

}
