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
  color: string,
  active: boolean
}

@Component({
  selector: 'app-home',
  templateUrl: './app.component.home.html',
  styleUrls: ['./app.component.home.css'],
})

export class AppComponentHome implements OnInit {
  private edtApi = EDTApi.getEdtApi()
  public cours: homeCours[] = []
  public logged = false

  constructor(private _routeur: Router) {
  }

  ngOnInit(): void {
    this.updateCours()
    this.edtApi.eventEmitter.on('update', () => {
      this.updateCours()
    })
  }

  updateCours(): void {
    let now = new Date()
    if(this.edtApi.user) {
      this.logged = true
      let cours = this.edtApi.user.edt.days
        .map((day): homeCours => {
          let startDate = new Date(day.debut * 1000)
          let endDate = new Date(day.fin * 1000)

          return {
            mat: day.mat,
            prof: day.prof,
            salle: day.salle,
            debut: startDate,
            fin: endDate,
            dateDuring: new Date(endDate.getTime() - startDate.getTime() - 3600000),
            color: day.color,
            active : false
          }
        })
        .sort((a, b) => a.debut.getTime() - b.debut.getTime())
        .filter(e => {
          return e.fin > now
        })
      this.cours = []
      for(let i = 0; i < cours.length && i < 4; i++) {
        if(cours[i].debut < now) cours[i].active = true
        this.cours.push(cours[i])
      }
    } else {
      this.logged = false
      this.cours = []
    }
  }
}
