import {HttpClient} from "@angular/common/http";
import {firstValueFrom, lastValueFrom, map} from "rxjs";

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
  constructor(private _httpClient: HttpClient) {
  }
  async getEdt(): Promise<Array<EDTDay>> {
    return await lastValueFrom(this._httpClient.get<Array<EDTDay>>(`/edt/`))
  }
}
