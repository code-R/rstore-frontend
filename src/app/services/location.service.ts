import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';

@Injectable()
export class LocationService {

  constructor(private http: HttpClient) { }

  index() {
    const uri = 'http://localhost:9000/api/v1.0/locations';

    return this
            .http
            .get(uri)
            .map(res => {
              return res;
          });
  }

  create(location: any) {
    const uri = 'http://localhost:9000/api/v1.0/locations';

    return this
            .http
            .post(uri, location)
            .map(res => {
              return res;
          });
  }
}
