import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';

@Injectable()
export class DepartmentService {
  public locationId:string;

  constructor(private http: HttpClient) { }

  _get_collection_url() {
    return `locations/${ this.locationId }/departments`
  }

  _get_item_url(departmentId) {
    return `locations/${ this.locationId }/departments/${ departmentId }`
  }

  index() {
    return this
            .http
            .get(this._get_collection_url())
            .map(res => {
              return res;
          });
  }

  create(department: any) {
    delete department.id;
    return this
            .http
            .post(this._get_collection_url(), department)
            .map(res => {
              return res;
          });
  }

  update(department: any) {
    return this
            .http
            .put(this._get_item_url(department.id), department)
            .map(res => {
              return res;
          });
  }

  destroy(departmentId) {
    return this
      .http
      .delete(this._get_item_url(departmentId))
      .map(res => {
        return res;
    });
  }
}
