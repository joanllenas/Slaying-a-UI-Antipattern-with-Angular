import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { SunriseSunsetService, Place } from "./sunriseSunset.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  places: Place[] = [
    { label: "New York City", lat: 40.7128, long: 74.006 },
    { label: "London", lat: 51.5074, long: 0.1278 },
    { label: "Barcelona", lat: 41.3851, long: 2.1734 }
  ];

  constructor(private service: SunriseSunsetService) {}

  setValueAndSend(form: NgForm, place: Place) {
    form.setValue({lat: place.lat, long: place.long});
    this.sendLatLong(form.value);
  }

  sendLatLong(place: Place) {
    this.service.getSunriseSunsetData(place);
  }
}
