// core
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// Routes
import { appRoutes } from './app.routes';

// Services
import { LocationService } from './services/location.service';
import { DepartmentService } from './services/department.service';
import { CategoryService } from './services/category.service';

// Interceptors
import { HttpRequestInterceptor } from './interceptors/http-request.interceptor';

// Components
import { LocationsComponent } from './locations/locations.component';
import { AppComponent } from './app.component';
import { DepartmentsComponent } from './departments/departments.component';
import { CategoriesComponent } from './categories/categories.component';


@NgModule({
  declarations: [
    AppComponent,
    LocationsComponent,
    DepartmentsComponent,
    CategoriesComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    LocationService,
    DepartmentService,
    CategoryService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
