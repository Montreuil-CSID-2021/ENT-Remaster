import {HttpClient} from "@angular/common/http";
import {lastValueFrom} from "rxjs";
import { io } from "socket.io-client";
import {checkForPrivateExports} from "@angular/compiler-cli/src/ngtsc/entry_point";
import {Router} from "@angular/router";

export interface EDTDay {
  mat: string,
  prof: string,
  salle: string,
  debut: number,
  debutText: string,
  fin: number,
  finText: string
}

export class EDTApi {

  private static edtApi: EDTApi
  socket

  days: any[] = []

  constructor() {
    EDTApi.edtApi = this
    this.socket = io('http://localhost:8081')
    this.socket.on('updateEdt', (days:Array<{map: string, salle: string, prof: string, debut: bigint, fin: bigint}>) => {
      console.log(days)
      this.days = days
    })
  }

  public static getEdtApi() {
    if(!EDTApi.edtApi) new EDTApi()

    return EDTApi.edtApi
  }

  async login(credentials: {username: string, password: string}) {
    return new Promise(resolve => {
      this.socket.once('login', success => {
        if(success) resolve(success);
      })
      this.socket.emit('login', credentials)
    })
  }

  async getEdt(): Promise<Array<EDTDay>> {
    //return await lastValueFrom(this._httpClient.get<Array<EDTDay>>(`/edt/`))
    return []
  }
}
