import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { AppComponent } from './edt/app.component';
import {AppComponentHome} from "./login/app.component.home";
import { AppRoutingModule } from './app-routing.module';
import {AppComponentRouter} from "./router/app.component.router";
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {AppComponentNavbar} from "./navbar/app.component.navbar";

@NgModule({
  declarations: [
    AppComponent,
    AppComponentHome,
    AppComponentRouter,
    AppComponentNavbar
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ScheduleModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponentRouter]
})
export class AppModule { }
