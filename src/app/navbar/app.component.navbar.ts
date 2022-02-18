import {Component, OnInit} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponentLogin} from "../login-dialog/dialog.component.login";

@Component({
  selector: 'app-nav',
  templateUrl: './app.component.navbar.html',
  styleUrls: ['./app.component.navbar.css'],
})

export class AppComponentNavbar implements OnInit {

  title = 'Emploi du temps CSID';

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.dialog.open(DialogComponentLogin)
  }
}
