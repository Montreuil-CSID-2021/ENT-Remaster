import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { AppComponent } from './app.component';
//import { ScheduleComp } from './schedule.component'

@NgModule({
  declarations: [
    AppComponent,
    //ScheduleComp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ScheduleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
