import { Routes } from '@angular/router';

import { LocationsComponent } from './locations/locations.component';
import { DepartmentsComponent } from './departments/departments.component';
import { CategoriesComponent } from './categories/categories.component';
import { SubCategoriesComponent } from './sub-categories/sub-categories.component';
import { D3GraphComponent } from './d3-graph/d3-graph.component';


export const appRoutes: Routes = [
  {
    path: '',
    component: LocationsComponent
  },
  {
    path: 'locations/:locationId/departments',
    component: DepartmentsComponent
  },
  {
    path: 'locations/:locationId/departments/:departmentId/categories',
    component: CategoriesComponent
  },
  {
    path: 'locations/:locationId/departments/:departmentId/categories/:categoryId/sub_categories',
    component: SubCategoriesComponent
  },
    {
    path: 'locations/:locationId/d3_graph',
    component: D3GraphComponent
  },
];
