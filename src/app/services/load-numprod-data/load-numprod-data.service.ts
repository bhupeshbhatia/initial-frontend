import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaderResponse } from '@angular/common/http';
import { interval } from 'rxjs/observable/interval';
import { timer, pipe } from 'rxjs';
import { Observable } from "rxjs/observable";
import { switchMap, catchError } from 'rxjs/operators';
import { environment } from '../../../config'
import { SendDate } from '../../_models'

const timeInterval = interval(10000);

@Injectable({
  providedIn: 'root'
})
export class LoadNumprodDataService {
  constructor(private http: HttpClient) {
  // this.checkData()
  }
    // this.getJSON()
    //   .subscribe(data => {
    //     console.log(data);
    //   });

  // checkData() {
  //   return timer(0, 5000)
  //     .pipe(
  //       switchMap(_ => this.getJSON()),
  //       catchError(error => (`Bad request: ${error}`))
  //     );
  // }

  public getJSON(days: number): any {

    var sendDates = []

    var sendDate = new SendDate();
    sendDate.from = this.getDays()[0];
    sendDate.to = this.getDays(1)[1];

    var sendDate2 = new SendDate();
    sendDate2.from = this.getDays()[0];
    sendDate2.to = this.getDays(2)[1];

    var sendDate3 = new SendDate();
    sendDate3.from = this.getDays()[0];
    sendDate3.to = this.getDays(3)[1];

    var sendDate4 = new SendDate();
    sendDate4.from = this.getDays()[0];
    sendDate4.to = this.getDays(4)[1];

    sendDates = [sendDate, sendDate2, sendDate3, sendDate4]

    console.log("}}}}}}}}}}}}}}}}}}}}")
    console.log(sendDate)
    return this.http.post(environment.apiUrl + '/twsalewaste', sendDates, {
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  public getDays(days?:number): Array<any>{
    var dates = []
    var from = Math.round(new Date().getTime() / 1000)
    var to = Math.round(new Date().getTime() / 1000) - (86400 * days)
    return dates = [
      from, to
    ]
  }

  // public sendDate(): any {
  //   var min_time = Math.round(new Date().getTime()/1000)
  //   var max_time = Math.round(new Date().getTime()/1000)
  //   var time_days = 1

  //   console.log("}}}}}}}}}}}}}}}}}}}}")
  //   console.log(date)
  //   return this.http.post(environment.apiUrl + '/twsalewaste',date,{headers: {
  //     "Content-Type": "application/json"
  //   }});
  // }

  // public getJSONPromise(timeData: JSON): Observable<HttpHeaderResponse> {
  //   return this.http.post<Response>(url, timeData,).pipe(
  //     tap(_ => console.log("date sent")),
  //     Response(),
  //     catchError()
  //   )
  // }

}
