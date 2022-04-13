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

import { loadCldr, L10n} from '@syncfusion/ej2-base';
import * as numberingSystems from 'cldr-data/supplemental/numberingSystems.json';
import * as gregorian from 'cldr-data/main/fr/ca-gregorian.json';
import * as numbers from 'cldr-data/main/fr/numbers.json';
import * as timeZoneNames from 'cldr-data/main/fr/timeZoneNames.json';

// Angular CLI 8.0 below versions
loadCldr(numberingSystems, gregorian, numbers, timeZoneNames)
L10n.load({
  'fr': {
    'schedule': {
      'day': 'Journée',
      'week': 'Semaine',
      'month': 'Mois',
      'today': "Aujourd'hui"
    },
    'calendar': {
      'today': "Aujourd'hui"
    }
  }
});

@Component({
  selector: 'app-edt',
  templateUrl: './app.component.edt.html',
  styleUrls: ['./app.component.edt.css'],
  providers: [DayService, WeekService, MonthService, AgendaService, ExcelExportService]
})

export class AppComponentEdt implements OnInit {
  @ViewChild('scheduleObj') scheduleObj!: ScheduleComponent;

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
    }, 10)

  }

  updateEvents() {
    if(this.edtApi.user) {
      this.scheduleObj.eventSettings.dataSource = this.edtApi.user.edt.days.map(e => {

        return {
          Subject: e.subject,
          StartTime: e.startDate,
          EndTime: e.endDate,
          DuringTime: new Date(e.endDate.getTime() - e.startDate.getTime() - 3600000),
          Location: e.location,
          Teacher: e.teacher,
          color: e.color
        }
      })
    } else {
      this.scheduleObj.eventSettings.dataSource = []
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
    window.print()
  }
}
