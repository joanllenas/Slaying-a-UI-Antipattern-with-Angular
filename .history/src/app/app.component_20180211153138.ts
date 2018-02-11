import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  lat = 38.8951;
  lng = -77.0364;

  sendLatLng(value){
    console.log(value);
  }
}
