import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';


@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  readonly rootUrl = 'http://localhost:9000/api/v1.0/';

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      url: this.getFullUrl(request.url)
    });
    return next.handle(request);
  }

  getFullUrl(relativeUri){
    return this.rootUrl + relativeUri;
  }
}