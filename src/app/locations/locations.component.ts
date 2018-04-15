import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { LocationService } from './../services/location.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {
  readonly AddAction = 'ADD';
  readonly UpdateAction = 'UPDATE';

  locations: any;
  locationForm: FormGroup;
  formAction: string = this.AddAction;

  constructor(
    private formBuilder: FormBuilder,
    private locationService: LocationService
    ) {
      this.locationForm = formBuilder.group({
          name: ['', Validators.required],
          description: ['', Validators.required],
          id: '',
        })
  }

  ngOnInit() {
    this.getLocations();
  }

  getLocations() {
    this.locationService.index().subscribe(res => {
      this.locations = res;
      this.locationForm.reset();
      this.formAction = this.AddAction;
    });
  }

  addLocation() {
    this.locationService.create(
      this.locationForm.value).subscribe(
        res => {
          this.getLocations();
      });
  }

  updateLocation() {
    this.locationService.update(
      this.locationForm.value).subscribe(
        res => {
          this.getLocations();
          this.formAction = this.AddAction;
      });
  }

  editLocation(location){
    delete location.created_at;
    this.formAction = this.UpdateAction;
    this.locationForm.setValue(location);
  }

  submitAction() {
    if (this.locationForm.value.id) {
      this.updateLocation();
    } else {
      this.addLocation();
    }
  }

  deleteLocation(locationId) {
    this.locationService.destroy(locationId).subscribe(res => {
      this.getLocations();
    });
  }
}
