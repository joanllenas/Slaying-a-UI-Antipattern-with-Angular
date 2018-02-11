import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class SunriseSunsetService {
  constructor(private http: HttpClient) {}

}
