import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { AppComponent } from './app.component';
import {AppComponentHome} from "./app.component.home";
import { AppRoutingModule } from './app-routing.module';
import {AppComponentRouter} from "./app.component.router";
//import { ScheduleComp } from './schedule.component'

@NgModule({
  declarations: [
    AppComponent,
    AppComponentHome,
    AppComponentRouter
    //ScheduleComp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ScheduleModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponentRouter]
})
export class AppModule { }
