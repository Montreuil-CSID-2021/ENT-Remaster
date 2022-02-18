import {Component} from "@angular/core";

@Component({
  templateUrl: './dialog.component.login.html',
  styleUrls: ['./dialog.component.login.css']
})
export class DialogComponentLogin {
  credentials = {username: '', password: ''}
}
