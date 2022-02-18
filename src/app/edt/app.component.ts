import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {
  AgendaService,
  DayService,
  EventRenderedArgs,
  EventSettingsModel,
  MonthService,
  ScheduleComponent,
  WeekService,
  ExcelExportService,
  ActionEventArgs,
  ToolbarActionArgs, ExportOptions, ExportFieldInfo
} from "@syncfusion/ej2-angular-schedule";
import {EDTApi} from "../EDTApi";
import { ItemModel } from '@syncfusion/ej2-angular-navigations';


@Component({
  selector: 'app-edt',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DayService, WeekService, MonthService, AgendaService, ExcelExportService]
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

  title = 'Emploi du temps'
  selectedEdt = ""
  showHeaderBar = true

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
      this.updateEvents()
      this.edtApi.eventEmitter.on('update', () => {
        this.updateEvents()
      })
    }, 1000)

  }

  updateEvents() {
    if(this.edtApi.user) {
      this.selectedEdt = this.edtApi.user.edt.name
      this.scheduleObj.eventSettings.dataSource = this.edtApi.user.edt.days.map(e => {
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

  public onActionBegin(args: ActionEventArgs & ToolbarActionArgs): void {
    if (args.requestType === 'toolbarItemRendering') {
      const exportItem: ItemModel = {
        text: 'Exporter en Excel', cssClass: 'e-excel-export', click: this.onExportClick.bind(this)
      };
      // @ts-ignore
      args.items.push(exportItem);
    }
  }

  public onExportClick(): void {
    const customFields: ExportFieldInfo[] = [
      { name: 'Subject', text: 'Cours' },
      { name: 'StartTime', text: 'Début' },
      { name: 'EndTime', text: 'Fin' },
      { name: 'Location', text: 'Salle' },
      { name: 'Teacher', text: 'Prof' }
    ];
    const exportValues: ExportOptions = { fieldsInfo: customFields , fileName: "Emploi du temps CSID"};
    this.scheduleObj.exportToExcel(exportValues);
  }

  public printPdf() {
    window.document.body.classList.add('printmode')
    window.print()
    window.document.body.classList.remove('printmode')
  }
}
