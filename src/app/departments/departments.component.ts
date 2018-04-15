import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { DepartmentService } from './../services/department.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {
  readonly AddAction = 'ADD';
  readonly UpdateAction = 'UPDATE';

  locationId: string;
  departments: any;
  departmentForm: FormGroup;
  formAction: string = this.AddAction;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private departmentService: DepartmentService
  ) {
      this.activatedRoute.params.subscribe(
        params => {
          this.locationId = params['locationId'];
          this.departmentService.locationId = this.locationId;
        }
      );

      this.departmentForm = formBuilder.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        id: '',
      })
  }

  ngOnInit() {
    this.getDepartments();
  }

  getDepartments() {
    this.departmentService.index().subscribe(res => {
      this.departments = res;
      this.departmentForm.reset();
      this.formAction = this.AddAction;
    });
  }

  addDepartment() {
    this.departmentService.create(
      this.departmentForm.value).subscribe(
        res => {
          this.getDepartments();
    });
  }

  updateDepartment() {
    this.departmentService.update(
      this.departmentForm.value).subscribe(
        res => {
          this.getDepartments();
    });
  }

  submitAction() {
    if (this.departmentForm.value.id) {
      this.updateDepartment();
    } else {
      this.addDepartment();
    }
  }

  deleteDepartment(departmentId) {
    this.departmentService.destroy(departmentId).subscribe(res => {
      this.getDepartments();
    });
  }

  editDepartment(department) {
    delete department.created_at;
    delete department.location_id;
    this.formAction = this.UpdateAction;
    this.departmentForm.setValue(department);
  }

}
