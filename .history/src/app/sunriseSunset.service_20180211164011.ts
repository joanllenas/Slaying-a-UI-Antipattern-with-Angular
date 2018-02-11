import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { catchError } from "rxjs/operators/catchError";
import { map } from "rxjs/operators/map";
import { of } from "rxjs/observable/of";

export interface Place {
  label: string;
  lat: number;
  long: number;
}

export interface ServiceResult {
  results:
  {
    sunrise:"7:27:02 AM",
    sunset:"5:05:55 PM"
  },
  status: 'OK' | 'INVALID_REQUEST' | 'INVALID_DATE' | 'UNKNOWN_ERROR'
}

export interface SunriseState {
  isLoading: boolean;
  error: string;
  data: {
    sunrise: string,
    sunset: string,
  }
}

@Injectable()
export class SunriseSunsetService {
  state: SunriseState = {
    isLoading: false,
    error: null,
    data: null
  }
  constructor(private http: HttpClient) {}

  getSunriseSunsetData(place: Place) {
    this.state.isLoading = true;
    this.state.error = null;
    this.state.data = null;
    this.http
      .get<ServiceResult>(`https://api.sunrise-sunset.org/json?lat=${place.lat}&lng=-${place.long}&date=today`)
      .pipe(
        catchError(err => {
          return of({
            isLoading: false,
            error: 'Error loading data',
            data: null
          })
        }),
        map(data => {
          return of({
            isLoading: false,
            error: null,
            data: {
              sunrise: data.results.sunrise,
              sunset: data.results.sunset,
            }
          })
        })
      )
      .subscribe(data => {

      });
  }
}
