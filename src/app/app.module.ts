import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// routes
import { appRoutes } from './app.routes';

// Components
import { LocationsComponent } from './locations/locations.component';
import { AppComponent } from './app.component';

// Services
import { LocationService } from './services/location.service';

@NgModule({
  declarations: [
    AppComponent,
    LocationsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [LocationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
