import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';

@Injectable()
export class SubCategoryService {
  public locationId: string;
  public departmentId: string;
  public categoryId: string;

  constructor(private http: HttpClient) { }

  _get_collection_url() {
    return `locations/${ this.locationId }/departments/${ this.departmentId }/categories/${ this.categoryId }/sub_categories`;
  }

  _get_item_url(subCategoryId) {
    return `locations/${ this.locationId }/departments/${ this.departmentId }/categories/${ this.categoryId }/sub_categories/${ subCategoryId }`;
  }

  index() {
    return this
            .http
            .get(this._get_collection_url())
            .map(res => {
              return res;
          });
  }

  create(category: any) {
    delete category.id;
    return this
            .http
            .post(this._get_collection_url(), category)
            .map(res => {
              return res;
          });
  }

  update(category: any) {
    return this
            .http
            .put(this._get_item_url(category.id), category)
            .map(res => {
              return res;
          });
  }

  destroy(categoryId) {
    return this
      .http
      .delete(this._get_item_url(categoryId))
      .map(res => {
        return res;
    });
  }
}
