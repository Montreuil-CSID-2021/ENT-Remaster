import {Component} from "@angular/core";
import {EDTApi} from "../EDTApi";
import {Router} from "@angular/router";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  templateUrl: './dialog.component.login.html',
  styleUrls: ['./dialog.component.login.css']
})
export class DialogComponentLogin {
  credentials = {username: '', password: ''}

  private edtApi: EDTApi
  loading = false
  error = false

  constructor(private _routeur: Router, private dialogRef: MatDialogRef<DialogComponentLogin>) {
    this.edtApi = EDTApi.getEdtApi()
  }

  login() {
    this.loading = true
    this.error = false
    this.edtApi.login(this.credentials)
      .then(async success => {
        this.loading = false
        if (success) {
          this.dialogRef.close()
        } else this.error = true
      })
  }
}
