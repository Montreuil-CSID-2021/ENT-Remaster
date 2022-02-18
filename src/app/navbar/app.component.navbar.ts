import {Component, OnInit} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponentLogin} from "../login-dialog/dialog.component.login";
import {EDTApi} from "../EDTApi";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav',
  templateUrl: './app.component.navbar.html',
  styleUrls: ['./app.component.navbar.css'],
})
export class AppComponentNavbar implements OnInit {
  title = 'ENT 2.0';
  edtName = ''
  userConnected = false
  private edtApi: EDTApi

  constructor(private dialog: MatDialog, private _router: Router) {
    this.edtApi = EDTApi.getEdtApi()

    this.edtApi.eventEmitter.on('update', () => {
      if(this.edtApi.user) {
        this.userConnected = true
        console.log(this.edtApi.user)
        this.edtName = ` - ${this.edtApi.user.edt.name}`
      } else {
        this.userConnected = false
        this.edtName = ''
      }
    })
  }

  login() {
    this.dialog.open(DialogComponentLogin)
  }

  logout() {
    this.edtApi.logout()
  }

  goToEnt() {
    this._router.navigateByUrl('/edt')
  }

  goToHome() {
    this._router.navigateByUrl('/home')
  }

  ngOnInit(): void {

  }
}
