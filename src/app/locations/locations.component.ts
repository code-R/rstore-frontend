import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { LocationService } from './../services/location.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {

  locations: any;
  locationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private locationService: LocationService
    ) {
      this.locationForm = formBuilder.group({
          name: ['', Validators.required],
          description: ['', Validators.required],
        })
  }

  ngOnInit() {
    this.getLocations();
  }

  getLocations(){
    this.locationService.index().subscribe(res => {
      this.locations = res;
    });
  }

  addLocation(){
    this.locationService.create(
      this.locationForm.value).subscribe(
        res => {
          this.getLocations();
          this.locationForm.reset();
      });
  }

}
