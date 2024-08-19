import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TripDataService } from '../services/trip-data.service';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.css'], 
})
export class EditTripComponent implements OnInit {
  editForm!: FormGroup;
  trip!: any;
  submitted = false;
  message: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripDataService: TripDataService
  ) {}

  ngOnInit(): void {
    const tripCode = localStorage.getItem('tripCode');
    if (!tripCode) {
      alert("Something went wrong, couldn't find the trip code!");
      this.router.navigate(['']);
      return;
    }
    console.log('EditTripComponent::ngOnInit');
    console.log('tripCode: ' + tripCode);

    // Initialize form
    this.editForm = this.formBuilder.group({
      _id: [], 
      code: [tripCode, Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
    });

    this.tripDataService.getTrip(tripCode).subscribe({
      next: (value: any) => {
        if (value && value.length > 0) {
          this.trip = value[0];
          // Populate the form with the retrieved data
          this.editForm.patchValue(this.trip);
          this.message = 'Trip: ' + tripCode + ' retrieved';
        } else {
          this.message = 'No Trip Retrieved';
        }
        console.log(this.message);
      },
      error: (error: any) => {
        console.error('Error fetching trip: ', error);
        this.message = 'Error fetching trip data';
      }
    });
  }

  public onSubmit(): void {
    this.submitted = true;
    if (this.editForm.valid) {
      this.tripDataService.updateTrip(this.editForm.value).subscribe({
        next: (value: any) => {
          console.log('Trip updated successfully:', value);
          this.router.navigate(['']);
        },
        error: (error: any) => {
          console.error('Error updating trip: ', error);
          this.message = 'Error updating trip data';
        }
      });
    }
  }

  // Getter for form controls
  get f() {
    return this.editForm.controls;
  }
}
