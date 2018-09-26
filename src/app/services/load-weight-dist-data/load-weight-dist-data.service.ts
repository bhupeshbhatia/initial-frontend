import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaderResponse } from '@angular/common/http';
import { interval } from 'rxjs/observable/interval';
import { timer, pipe } from 'rxjs';
import { Observable } from "rxjs/observable";
import { switchMap, catchError } from 'rxjs/operators';
import { environment } from '../../../config'
import { SendDate } from '../../_models'

@Injectable({
  providedIn: 'root'
})
export class LoadWeightDistDataService {

  constructor(private http: HttpClient) { }

  public getJSON(days: number): any {

    var today = []
    today = [this.getDays()[0]]

    console.log("}}}}}}}}}}}}}}}}}}}}")
    console.log(today)
    return this.http.post(environment.apiUrl + '/dist-weight', today, {
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  public getDays(days?: number): Array<any> {
    var dates = []
    var from = Math.round(new Date().getTime() / 1000)
    var to = Math.round(new Date().getTime() / 1000) - (86400 * days)
    return dates = [
      from, to
    ]
  }
}
