import { Injectable } from "@angular/core";
import { HttpClient } from "selenium-webdriver/http";

@Injectable()
class SunrriseSunsetService {
  constructor(private http: HttpClient) {}
}
