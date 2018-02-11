import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { catchError } from "rxjs/operators/catchError";
import { map } from "rxjs/operators/map";
import { delay } from "rxjs/operators/delay";
import { of } from "rxjs/observable/of";
import { RemoteData, NotAsked, Loading, Success, Faliure } from "./remote-data";

export interface Place {
  label: string;
  lat: number;
  long: number;
}

export interface ServiceResult {
  results: {
    sunrise: string,
    sunset: string
  },
  status: 'OK' | 'INVALID_REQUEST' | 'INVALID_DATE' | 'UNKNOWN_ERROR'
}

@Injectable()
export class SunriseSunsetService {
  state: RemoteData<string, ServiceResult> = new NotAsked();

  constructor(private http: HttpClient) {}

  extractSuccess() {
    return (this.state as Success<ServiceResult>).fold();
  }

  extractFaliure() {
    return (this.state as Faliure<string>).fold();
  }

  // API: https://sunrise-sunset.org/api
  getSunriseSunsetData(place: Place, forceError: boolean) {
    this.state = new Loading();
    const query = forceError ? `lng=-${place.long}` : `lat=${place.lat}&lng=-${place.long}`;
    this.http
      .get<ServiceResult>(`https://api.sunrise-sunset.org/json?${query}&date=today`)
      .pipe(
        delay(1000),
        map((data: ServiceResult) => {
          if(data.status !== 'OK') {
            of(new Error(data.status));
          } else {
            return new Success<ServiceResult>(data)
          }
        }),
        catchError((err: Error) => {
          return of(new Faliure<string>(err.message))
        })
      )
      .subscribe(state => {
        this.state = state;
      });
  }
}
