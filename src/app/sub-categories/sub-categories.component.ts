import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { SubCategoryService } from './../services/sub-category.service';

@Component({
  selector: 'app-sub-categories',
  templateUrl: './sub-categories.component.html',
  styleUrls: ['./sub-categories.component.css']
})
export class SubCategoriesComponent implements OnInit {
  readonly AddAction = 'ADD';
  readonly UpdateAction = 'UPDATE';

  locationId: string;
  departmentId: string;
  categoryId: string;
  subCategories: any;
  subCategoryForm: FormGroup;
  formAction: string = this.AddAction;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private subCategoryService: SubCategoryService
  ) {
      this.activatedRoute.params.subscribe(
        params => {
          this.locationId = params['locationId'];
          this.departmentId = params['departmentId'];
          this.categoryId =  params['categoryId'];
          this.subCategoryService.locationId = this.locationId;
          this.subCategoryService.departmentId = this.departmentId;
          this.subCategoryService.categoryId = this.categoryId;
        }
      );

      this.subCategoryForm = formBuilder.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        id: '',
      })
  }

  ngOnInit() {
    this.getSubCategories();
  }

  getSubCategories() {
    this.subCategoryService.index().subscribe(res => {
      this.subCategories = res;
      this.subCategoryForm.reset();
      this.formAction = this.AddAction;
    });
  }

  addSubCategory() {
    this.subCategoryService.create(
      this.subCategoryForm.value).subscribe(
        res => {
          this.getSubCategories();
    });
  }

  updateSubCategory() {
    this.subCategoryService.update(
      this.subCategoryForm.value).subscribe(
        res => {
          this.getSubCategories();
    });
  }

  submitAction() {
    if (this.subCategoryForm.value.id) {
      this.updateSubCategory();
    } else {
      this.addSubCategory();
    }
  }

  deleteSubCategory(subCategoryId) {
    this.subCategoryService.destroy(subCategoryId).subscribe(res => {
      this.getSubCategories();
    });
  }

  editSubCategory(subCategory) {
    delete subCategory.created_at;
    delete subCategory.location_id;
    delete subCategory.department_id;
    delete subCategory.category_id;
    this.formAction = this.UpdateAction;
    this.subCategoryForm.setValue(subCategory);
  }

}
