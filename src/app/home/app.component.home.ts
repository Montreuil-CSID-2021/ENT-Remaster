import {Component, OnInit} from "@angular/core";
import {EDTApi} from "../EDTApi";
import {Router} from "@angular/router";

export interface homeCours {
  mat: string,
  prof: string,
  salle: string,
  debut: Date,
  fin: Date,
  dateDuring: Date,
  color: string
}

@Component({
  selector: 'app-home',
  templateUrl: './app.component.home.html',
  styleUrls: ['./app.component.home.css'],
})

export class AppComponentHome implements OnInit {
  private colors = ["#fceeac", "#c9fcac", "#c3fad5", "#bafaee", "#c7f6fc", "#e9edfe", "#e6eefe", "#fee7fc", "#fee9e6", "#feecc2", "#fcbfbf", "#bccdff", "#b8fec9", "#bfccfb", "#eac7b2", "#fcc0b0"]
  private matColor: Array<{mat: string, color: string}> = []
  private edtApi = EDTApi.getEdtApi()
  public cours: homeCours[] = [];

  constructor(private _routeur: Router) {
  }

  ngOnInit(): void {
    this.edtApi.eventEmitter.on('update', () => {
      this.updateCours()
    })
  }

  updateCours(): void {
    if(this.edtApi.user) {
      let cours = this.edtApi.user.edt.days
        .map((day): homeCours => {
          let color = "#e5e5e5"
          let potentialColor = this.matColor.find(mc => mc.mat === day.mat.toLowerCase())

          if(potentialColor) {
            color = potentialColor.color
          } else {
            let matColorSize = this.matColor.length
            if(matColorSize < this.colors.length) {
              color = this.colors[matColorSize]
              this.matColor.push({
                mat: day.mat.toLowerCase(),
                color: color
              })
            }
          }

          let startDate = new Date(day.debut * 1000)
          let endDate = new Date(day.fin * 1000)

          return {
            mat: day.mat,
            prof: day.prof,
            salle: day.salle,
            debut: startDate,
            fin: endDate,
            dateDuring: new Date(endDate.getTime() - startDate.getTime() - 3600000),
            color: color
          }
        })
        .sort((a, b) => a.debut.getTime() - b.debut.getTime())
        .filter(e => e.debut > new Date())
      this.cours = []
      for(let i = 0; i < cours.length && i <= 5; i++) {
        this.cours.push(cours[i])
      }
    } else this.cours = []
  }
}
