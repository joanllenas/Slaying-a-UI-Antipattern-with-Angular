import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { catchError } from "rxjs/operators/catchError";
import { map } from "rxjs/operators/map";
import { delay } from "rxjs/operators/delay";
import { of } from "rxjs/observable/of";

export interface Place {
  label: string;
  lat: number;
  long: number;
}

export interface ServiceResult {
  results: {
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

  // API: https://sunrise-sunset.org/api
  getSunriseSunsetData(place: Place, forceError: boolean) {
    this.state.isLoading = true;
    this.state.error = null;
    this.state.data = null;
    const query = forceError ? `lng=-${place.long}` : `lat=${place.lat}&lng=-${place.long}`;
    this.http
      .get<ServiceResult>(`https://api.sunrise-sunset.org/json?${query}&date=today`)
      .pipe(
        delay(1000),
        map((data: ServiceResult) => {
          if(data.status !== 'OK') {
            console.log('map', data.status)
            of(new Error(data.status));
          } else {
            return {
              isLoading: false,
              error: null,
              data: {
                sunrise: data.results.sunrise,
                sunset: data.results.sunset,
              }
            }
          }
        }),
        catchError((err: Error) => {
          console.log('catchError', err)
          return of({
            isLoading: false,
            error: err.message || 'Error loading data',
            data: null
          })
        })
      )
      .subscribe(state => {
        this.state = state;
      });
  }
}
