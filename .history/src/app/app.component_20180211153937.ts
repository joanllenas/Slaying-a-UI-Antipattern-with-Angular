import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  places = [
    { label: "New York City", lat: 40.7128, long: 74.006 },
    { label: "London", lat: 51.5074, long: 0.1278 },
    { label: "Barcelona", lat: 41.3851, long: 2.1734 }
  ];

  sendLatLng(value) {
    console.log(value);
  }
}
