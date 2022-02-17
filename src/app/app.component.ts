import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {
  AgendaService,
  DayService,
  EventRenderedArgs,
  EventSettingsModel,
  MonthService,
  ScheduleComponent,
  WeekService
} from "@syncfusion/ej2-angular-schedule";
import {EDTApi} from "./edt/EDTApi";

@Component({
  selector: 'app-edt',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DayService, WeekService, MonthService, AgendaService]
})

export class AppComponent implements OnInit {
  @ViewChild('scheduleObj') scheduleObj!: ScheduleComponent;

  private colors = ["#fceeac", "#c9fcac", "#c3fad5", "#bafaee", "#c7f6fc", "#e9edfe", "#e6eefe", "#fee7fc", "#fee9e6", "#feecc2", "#fcbfbf", "#bccdff", "#b8fec9", "#bfccfb", "#eac7b2", "#fcc0b0"]
  private matColor: Array<{mat: string, color: string}> = []

  private edtApi: EDTApi
  constructor(private _httpClient: HttpClient) {
    this.edtApi = EDTApi.getEdtApi()
  }

  public fistDayOfWeek: number = 1
  public eventSettings: EventSettingsModel = {
    allowEditing: false,
    allowAdding: false,
    allowDeleting: false,
  }

  title = 'Emploi du temps';

  applyCategoryColor(args: EventRenderedArgs): void {
    let categoryColor: string = args.data['color'] as string;
    if (!args.element || !categoryColor) {
      return;
    }
    if (this.scheduleObj.currentView === 'Agenda') {
      (args.element.firstChild as HTMLElement).style.borderLeftColor = categoryColor;
    } else {
      args.element.style.backgroundColor = categoryColor;
    }
  }

  ngOnInit() {
    setTimeout(() => {
      console.log("Initialisation")
      this.updateEvents()
      this.edtApi.socket.on('updateEdt', () => {
        this.updateEvents()
      })
    }, 1000)

  }

  updateEvents() {
    this.scheduleObj.eventSettings.dataSource = this.edtApi.days.map(e => {
      let color = "#e5e5e5"
      let potentialColor = this.matColor.find(mc => mc.mat === e.mat.toLowerCase())

      if(potentialColor) {
        color = potentialColor.color
      } else {
        let matColorSize = this.matColor.length
        if(matColorSize < this.colors.length) {
          color = this.colors[matColorSize]
          this.matColor.push({
            mat: e.mat.toLowerCase(),
            color: color
          })
        }
      }

      let startDate = new Date(e.debut * 1000)
      let endDate = new Date(e.fin * 1000)
      return {
        Subject: e.mat,
        StartTime: startDate,
        EndTime: endDate,
        DuringTime: new Date(endDate.getTime() - startDate.getTime() - 3600000),
        Location: e.salle,
        Teacher: e.prof,
        color: color
      }
    })
  }
}
