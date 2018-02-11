import { Injectable } from "@angular/core";
import { HttpClient } from "selenium-webdriver/http";

@Injectable()
export class SunrriseSunsetService {
  constructor(private http: HttpClient) {}
}
