import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

import * as config from "../../config.json";

export interface apodPicture {
  hdurl: string
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private _httpClient: HttpClient) {
  }

  title = 'nasangularproject';
  homePageImage = "https://http.cat/102";

  ngOnInit() {
    this._httpClient.get<apodPicture>(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY`)
      .subscribe(res => {
        this.homePageImage = res.hdurl
      })
  }
}
