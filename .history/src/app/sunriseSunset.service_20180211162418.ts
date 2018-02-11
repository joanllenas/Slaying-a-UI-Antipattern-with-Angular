import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

export interface Place {
  label: string;
  lat: number;
  long: number;
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
  constructor(private http: HttpClient) {}

  getSunriseSunsetData(place: Place): Observable<any> {
    return this.http.get(`https://api.sunrise-sunset.org/json?lat=${place.lat}&lng=-${place.long}&date=today`);
  }
}
