import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';

@Injectable()
export class GraphService {

  constructor(private http: HttpClient) { }

  getData(locationId) {
    return this
        .http
        .get(`locations/${ locationId }/hiera_data`)
        .map(res => {
          return res;
     });
  }
}
