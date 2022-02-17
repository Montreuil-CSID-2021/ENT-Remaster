import {Component, OnInit} from "@angular/core";
import {EDTApi} from "./edt/EDTApi";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './app.component.home.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponentHome implements OnInit {
  credentials = {username: '', password: ''}

  title = 'Emploi du temps';

  private edtApi = EDTApi.getEdtApi()

  constructor(private _routeur: Router) {
  }

  onClick() {

  }

  login() {
    this.edtApi.login(this.credentials).then(async success => {
      if(success) await this._routeur.navigateByUrl("/edt")
    })
  }

  ngOnInit(): void {

    console.log('blop')
  }
}
