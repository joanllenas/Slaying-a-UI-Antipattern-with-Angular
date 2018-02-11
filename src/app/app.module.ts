import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SunriseSunsetService } from './sunriseSunset.service';
import { IsNotAskedPipe, IsLoadingPipe, IsFaliurePipe, IsSuccessPipe } from './remote-data';


@NgModule({
  declarations: [
    AppComponent,
    IsNotAskedPipe,
    IsLoadingPipe,
    IsFaliurePipe,
    IsSuccessPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [SunriseSunsetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
