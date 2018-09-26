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

  public getJSON(): any {
    var from = Math.round(new Date().getTime() / 1000)
    var to = Math.round(new Date().getTime() / 1000) - 86400
    var sendDate = new SendDate()
    sendDate.from = from;
    sendDate.to = to;

    console.log("}}}}}}}}}}}}}}}}}}}}")
    console.log(sendDate)
    return this.http.post(environment.apiUrl + '/twsalewaste', sendDate, {
      headers: {
        "Content-Type": "application/json"
      }
    });
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
