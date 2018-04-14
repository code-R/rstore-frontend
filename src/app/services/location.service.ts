import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';

@Injectable()
export class LocationService {

  constructor(private http: HttpClient) { }

  index() {
    return this
            .http
            .get('locations')
            .map(res => {
              return res;
          });
  }

  create(location: any) {
    return this
            .http
            .post('locations', location)
            .map(res => {
              return res;
          });
  }
}
