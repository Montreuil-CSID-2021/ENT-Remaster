import { io } from "socket.io-client";
import * as Events from "events";

export interface EDTDay {
  mat: string,
  prof: string,
  salle: string,
  debut: number,
  debutText: string,
  fin: number,
  finText: string
}

export interface EdtUser {
  username: string,
  edt: {
    name: string,
    days: Array<EDTDay>
  }
}

export class EDTApi {
  private static edtApi: EDTApi
  private socket
  eventEmitter = new Events.EventEmitter()
  user: EdtUser | undefined = undefined

  constructor() {
    EDTApi.edtApi = this
    this.socket = io('http://localhost:8081')
    this.socket.on('update', (data: Array<EDTDay>) => {
      if(this.user) {
        this.user.edt.days = data
        this.eventEmitter.emit('update')
      }
    })
  }

  public static getEdtApi() {
    if(!EDTApi.edtApi) new EDTApi()

    return EDTApi.edtApi
  }

  async login(credentials: {username: string, password: string}) {
    return new Promise(resolve => {
      this.socket.once('login', (user: EdtUser | null) => {
        if(user) {
          console.log(user)
          this.user = user
          resolve(true);
          this.eventEmitter.emit('update')
        } else resolve(false)
      })
      this.socket.emit('login', credentials)
    })
  }

  logout() {
    this.user = undefined
    this.eventEmitter.emit('update')
  }
}
