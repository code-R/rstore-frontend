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
import { SubCategoryService } from './services/sub-category.service';
import { GraphService } from './services/graph.service';

// Interceptors
import { HttpRequestInterceptor } from './interceptors/http-request.interceptor';

// Components
import { LocationsComponent } from './locations/locations.component';
import { AppComponent } from './app.component';
import { DepartmentsComponent } from './departments/departments.component';
import { CategoriesComponent } from './categories/categories.component';
import { SubCategoriesComponent } from './sub-categories/sub-categories.component';
import { D3GraphComponent } from './d3-graph/d3-graph.component';


@NgModule({
  declarations: [
    AppComponent,
    LocationsComponent,
    DepartmentsComponent,
    CategoriesComponent,
    SubCategoriesComponent,
    D3GraphComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    GraphService,
    LocationService,
    DepartmentService,
    CategoryService,
    SubCategoryService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
