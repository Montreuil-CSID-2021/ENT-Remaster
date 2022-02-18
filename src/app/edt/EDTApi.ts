import { io } from "socket.io-client";

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
  selectedEdt = ""
  username = ""

  constructor() {
    EDTApi.edtApi = this
    this.socket = io('http://localhost:8081')
    this.socket.on('updateEdt', (data:{selectedEdt: string, days: Array<{map: string, salle: string, prof: string, debut: bigint, fin: bigint}>}) => {
      console.log(data)
      this.days = data.days
      this.selectedEdt = data.selectedEdt
    })
  }

  public static getEdtApi() {
    if(!EDTApi.edtApi) new EDTApi()

    return EDTApi.edtApi
  }

  async login(data: {selectedEdt: string, credentials: {username: string, password: string}}) {
    return new Promise(resolve => {
      this.socket.once('login', success => {
        this.username = data.credentials.username
        if(success) resolve(success);
      })
      this.socket.emit('login', data)
    })
  }
}
