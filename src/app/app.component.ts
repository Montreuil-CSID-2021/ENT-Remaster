import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {
  DayService,
  WeekService,
  WorkWeekService,
  MonthService,
  AgendaService,
  EventSettingsModel
} from '@syncfusion/ej2-angular-schedule';
import {EDTApi} from "./edt/EDTApi";
import config from "../../config.json";

@Component({
  selector: 'app-edt',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService]
})

export class AppComponent implements OnInit {
  private edtApi: EDTApi
  constructor(private _httpClient: HttpClient) {
    this.edtApi = new EDTApi(_httpClient)
  }

  public data: object[] = [
    {
      Subject: 'Meeting',
      StartTime: new Date(2022, 1, 3, 10, 0),
      EndTime: new Date(2022, 1, 3, 12, 0)
    }
  ]

  public eventSettings: EventSettingsModel = {
    allowEditing: false,
    dataSource: this.data,
    allowAdding: false,
    allowDeleting: false,
  }

  title = 'Emploi du temps CSID';

  ngOnInit() {
    console.log("Initialisation")
    this.edtApi.getEdt().then((edt) => {
      console.log(edt)
      this.data = this.data.concat(edt.map(e => {

      }))
    })
  }
}
