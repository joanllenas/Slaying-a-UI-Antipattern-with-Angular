import { Injectable } from "@angular/core";
import { HttpClient } from "selenium-webdriver/http";

@Injectable()
export class SunriseSunsetService {
  constructor(private http: HttpClient) {}

}