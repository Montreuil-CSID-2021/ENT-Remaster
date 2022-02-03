import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {
  AgendaService,
  DayService,
  EventSettingsModel,
  MonthService,
  ScheduleComponent,
  WeekService
} from "@syncfusion/ej2-angular-schedule";
import {EDTApi} from "./edt/EDTApi";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DayService, WeekService, MonthService, AgendaService]
})

export class AppComponent implements OnInit {
  @ViewChild('scheduleObj') scheduleObj!: ScheduleComponent;

  private edtApi: EDTApi
  constructor(private _httpClient: HttpClient) {
    this.edtApi = new EDTApi(_httpClient)
  }

  public eventSettings: EventSettingsModel = {
    allowEditing: false,
    allowAdding: false,
    allowDeleting: false,
  }

  title = 'Emploi du temps CSID';


  ngOnInit() {
    console.log("Initialisation")
    this.edtApi.getEdt().then(async (edt) => {
      console.log(edt)
      this.scheduleObj.eventSettings.dataSource = edt.map(e => {
        let startDate = new Date(e.debut * 1000)
        let endDate = new Date(e.fin * 1000)
        return {
          Subject: e.mat,
          StartTime: startDate,
          EndTime: endDate,
          Location: `${e.salle} - ${e.prof}`,
        }
      })
    })
  }
}
