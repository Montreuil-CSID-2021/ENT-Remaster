import { io } from "socket.io-client";
import * as Events from "events";

export interface ApiUser {
  username: string,
  defaultEdt: string
}

export interface ApiDay {
  subject: string,
  teacher: string,
  location: string,
  startDate: string,
  endDate: string,
  color: string
}

export interface EDTDay {
  subject: string,
  teacher: string,
  location: string,
  startDate: Date,
  endDate: Date,
  color: string
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
    this.socket = io('http://localhost:4201')
    this.socket.on('update', (data: Array<ApiDay>) => {
      if(this.user) {
        this.user.edt.days = data.map(day => {
          return {
            subject: day.subject,
            teacher: day.teacher,
            location: day.location,
            startDate: new Date(day.startDate),
            endDate: new Date(day.endDate),
            color: day.color
          }
        })
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
      this.socket.once('login', (user: ApiUser | null) => {
        if(user) {
          console.log(user)
          this.user = {
            username: user.username,
            edt: {
              name : user.defaultEdt,
              days: []
            }
          }
          resolve(true);
          this.eventEmitter.emit('update')
        } else resolve(false)
      })
      this.socket.emit('loginForWeb', credentials)
    })
  }

  logout() {
    this.user = undefined
    this.eventEmitter.emit('update')
  }
}
