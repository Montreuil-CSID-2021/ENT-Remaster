import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {EDTApi} from "../EDTApi";

export interface searchCours {
  mat: string,
  prof: string,
  salle: string,
  debut: Date,
  fin: Date,
  dateDuring: Date,
  color: string,
  dateForFiltre: string
}

@Component({
  selector: 'app-edt',
  templateUrl: './app.component.search.html',
  styleUrls: ['./app.component.search.css']
})

export class AppComponentSearch implements OnInit {
  private edtApi: EDTApi
  searchInput = ""
  onlyFutur = true

  public cours: searchCours[] = []
  public logged = false
  public nbCours = 0

  constructor(private _httpClient: HttpClient) {
    this.edtApi = EDTApi.getEdtApi()
  }

  ngOnInit(): void {
    this.updateCours()
    this.edtApi.eventEmitter.on('update', () => {
      this.updateCours()
    })
  }

  updateCours(): void {
    let now = new Date()
    if (this.edtApi.user) {
      this.logged = true
      this.nbCours = this.edtApi.user.edt.days.length
      this.cours = this.edtApi.user.edt.days
        .map((day): searchCours => {
          let duringDate = new Date(day.endDate.getTime() - day.startDate.getTime() - 3600000)

          return {
            mat: day.subject,
            prof: day.teacher,
            salle: day.location,
            debut: day.startDate,
            fin: day.endDate,
            dateDuring: duringDate,
            color: day.color,
            dateForFiltre: `${day.startDate.toLocaleDateString('fr-FR', {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric"
            })} ${day.startDate.toLocaleTimeString('fr-FR', {
              hour: "numeric",
              minute: "numeric"
            })} - ${day.endDate.toLocaleTimeString('fr-FR', {
              hour: "numeric",
              minute: "numeric"
            })} (${duringDate.toLocaleTimeString('fr-FR', {hour: "numeric", minute: "numeric"})})`
          }
        })
        .sort((a, b) => a.debut.getTime() - b.debut.getTime())
        .filter(e => {
          let valide = true

          if (e.fin <= now && this.onlyFutur) valide = false
          else {
            this.searchInput.split(' ').forEach(el => {
              if(!valide) return
              if (!JSON.stringify(e).toLowerCase().includes(el.toLowerCase())) valide = false
            })
          }

          return valide
        })
    } else {
      this.logged = false
      this.nbCours = 0
      this.cours = []
    }
  }
}
