import * as Events from "events";
import axios from "axios"

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
  color: string,
  type?: string
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
  eventEmitter = new Events.EventEmitter()
  user: EdtUser | undefined = undefined

  private static colorPalette: Array<string> = [
    "#fceeac",
    "#c9fcac",
    "#c3fad5",
    "#bafaee",
    "#c7f6fc",
    "#e9edfe",
    "#e6eefe",
    "#fee7fc",
    "#fee9e6",
    "#feecc2",
    "#fcbfbf",
    "#bccdff",
    "#b8fec9",
    "#bfccfb",
    "#eac7b2",
    "#fcc0b0"
  ]

  private static attributedColors: Array<{subject: string, color: string}> = []

  constructor() {
    EDTApi.edtApi = this
  }

  public static getEdtApi() {
    if(!EDTApi.edtApi) new EDTApi()

    return EDTApi.edtApi
  }

  async login(credentials: {username: string, password: string}) {
    return new Promise(resolve => {
      const url = "/edt"
      axios.get(url, {
        auth: {
          username: credentials.username,
          password: credentials.password
        }
      }).then(res => {
        let courses: Array<EDTDay> = res.data.split('BEGIN:VEVENT').slice(1).map((brut:string): EDTDay => {
          let course: EDTDay = {
            subject: "?",
            teacher: "?",
            location: "?",
            startDate: new Date(),
            endDate: new Date(),
            color: ""
          }

          let summaryExtract = brut.match(/SUMMARY:.*/)
          if(summaryExtract && summaryExtract.length > 0) {
            let summary = summaryExtract[0].replace('SUMMARY:', '')
            let splitSummary = summary.split(/(Cours|TD|Controle)/)

            if (splitSummary[2]) {
              let brutData = splitSummary[2]
              if (brutData.includes("SALLE VIDE")) {
                course.location = "A distance"
                brutData = brutData.replace("SALLE VIDE", "").trim()
              } else {
                let brutDataSplit = brutData.split(' ')
                course.location = brutDataSplit[brutDataSplit.length - 1]
                brutData = brutData.replace(course.location, "").trim()
              }

              if (brutData.includes('PROF VIDE')) {
                course.teacher = "En autonomie"
              } else {
                course.teacher = brutData
              }
            }

            course.subject = splitSummary[0]?.trim()
            course.type = splitSummary[1]?.trim()
            let startDateExtract = brut.match(/DTSTART;TZID=Europe\/Paris:.*/)
            console.log((startDateExtract) ? startDateExtract[0].replace("DTSTART;TZID=Europe\/Paris:", '') : "nulllllll")
            course.startDate = (startDateExtract) ? EDTApi.parseICALDate(startDateExtract[0].replace("DTSTART;TZID=Europe\/Paris:", '')) : new Date()
            let endDateExtract = brut.match(/DTEND;TZID=Europe\/Paris:.*/)
            course.endDate = (endDateExtract) ? EDTApi.parseICALDate(endDateExtract[0].replace("DTEND;TZID=Europe\/Paris:", '')) : new Date()


            let potentialColor = EDTApi.attributedColors.find(ac => ac.subject === course.subject)
            if(potentialColor) course.color = potentialColor.color
            else {
              let potentialNewColor = EDTApi.colorPalette.find(c => !EDTApi.attributedColors.find(ac => ac.color === c))
              if(potentialNewColor) course.color = potentialNewColor
              else course.color = "#e5e5e5"

              EDTApi.attributedColors.push({
                subject: course.subject,
                color: course.color
              })
            }
          }

          return course
        })

        this.user = {
          username: credentials.username,
          edt: {
            name : "CSID",
            days: courses
          }
        }
        resolve(true);
        this.eventEmitter.emit('update')
      })

      /*this.socket.once('login', (user: ApiUser | null) => {
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
      this.socket.emit('loginForWeb', credentials)*/
    })
  }

  logout() {
    this.user = undefined
    this.eventEmitter.emit('update')
  }

  private static parseICALDate(stringDate: string): Date {
    return new Date(Number(stringDate.slice(0, 4)), Number(stringDate.slice(4,6))-1, Number(stringDate.slice(6, 8)), Number(stringDate.slice(9, 11)), Number(stringDate.slice(11, 13)))
  }
}
