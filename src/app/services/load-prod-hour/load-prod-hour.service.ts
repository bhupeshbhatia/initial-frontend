import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaderResponse } from '@angular/common/http';
import { interval } from 'rxjs/observable/interval';
import { timer, pipe } from 'rxjs';
import { Observable } from "rxjs/observable";
import { switchMap, catchError } from 'rxjs/operators';
import { environment } from 'config'
import { SendDate } from '../../_models'

@Injectable({
  providedIn: 'root'
})
export class LoadProdHourService {

  constructor(private http: HttpClient) { }

  public getJSON(days: number): any {

    var sendDates = []

    var sendDate = new SendDate();
    sendDate.end_date = this.getDays()[0];
    sendDate.start_date = this.getDays(1)[1];

    var sendDate2 = new SendDate();
    sendDate2.end_date = this.getDays()[0];
    sendDate2.start_date = this.getDays(2)[1];

    var sendDate3 = new SendDate();
    sendDate3.end_date = this.getDays()[0];
    sendDate3.start_date = this.getDays(3)[1];

    var sendDate4 = new SendDate();
    sendDate4.end_date = this.getDays()[0];
    sendDate4.start_date = this.getDays(4)[1]

    sendDates = [sendDate, sendDate2, sendDate3, sendDate4]

    console.log("}}}}}}}}}}}}}}}}}}}}")
    console.log(sendDate)
    return this.http.post(environment.apiUrl + '/perday-sale', sendDates, {
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  public getDays(days?: number): Array<any> {
    var dates = []
    var end_date = Math.round(new Date().getTime() / 1000)
    var start_date = Math.round(new Date().getTime() / 1000) - (86400 * days)
    return dates = [
      end_date, start_date
    ]
  }
}
