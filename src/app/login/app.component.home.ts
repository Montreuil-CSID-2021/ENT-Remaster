import {Component, OnInit} from "@angular/core";
import {EDTApi} from "../EDTApi";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './app.component.home.html',
  styleUrls: ['./app.component.login.css'],
})

export class AppComponentHome implements OnInit {
  credentials = {username: '', password: ''}
  selectedEdt = "Par défaut"

  title = 'Emploi du temps';

  private edtApi = EDTApi.getEdtApi()

  constructor(private _routeur: Router) {
  }

  onClick() {

  }

  login() {
    this.edtApi.login( {selectedEdt: this.selectedEdt, credentials: this.credentials}).then(async success => {
      if(success) await this._routeur.navigateByUrl("/edt")
    })
  }

  ngOnInit(): void {

    console.log('blop')
  }
}
