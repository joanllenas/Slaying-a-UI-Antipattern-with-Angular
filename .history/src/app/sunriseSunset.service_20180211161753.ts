import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

export interface Place {
  label: string;
  lat: number;
  long: number;
}

@Injectable()
export class SunriseSunsetService {
  constructor(private http: HttpClient) {}

  getSunriseSunsetData(place: Place): Observable<any> {
    return;
  }
}
