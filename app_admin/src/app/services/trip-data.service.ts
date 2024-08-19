import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, lastValueFrom } from 'rxjs';

import { Trip } from '../models/trip';
import { User} from '../models/user'; 
import { AuthResponse } from '../models/auth-response';
import { BROWSER_STORAGE } from '../storage';

@Injectable({
  providedIn: 'root'
})

export class TripDataService {

  constructor(private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {}
  private tripUrl = 'http://localhost:3000/api/trips';
  private apiBaseUrl = 'http://localhost:3000/api/';

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.tripUrl);
  }

  addTrip(formData: Trip): Observable<Trip[]> {
    return this.http.post<Trip[]>(this.tripUrl, formData);
  }

  getTrip(tripCode: string): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.tripUrl + '/' + tripCode);
  }

  updateTrip(formData: Trip): Observable<Trip> {
    return this.http.put<Trip>(this.tripUrl + '/' + formData.code, formData);
  }

  public login(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('login', user);
  }

  public register(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('register', user);
  }

  private async makeAuthApiCall( urlPath: string, user: User): Promise<AuthResponse> {
    const url: string = `${this.apiBaseUrl}/${urlPath}`;
    return (await lastValueFrom(this.http.post(url, user))) as AuthResponse;
  }
}