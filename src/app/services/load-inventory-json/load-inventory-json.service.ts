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
export class LoadInventoryJsonService {
  constructor(private http: HttpClient) {
    // this.checkData()
  }
  // this.getJSON()
  //   .subscribe(data => {
  //     console.log(data);
  //   });

  public getJSON(): any {


    var sendDate = new SendDate();
    sendDate.end_date = this.getDays()[0];
    console.log("}}}}}}}}}}}}}}}}}}}}")
    console.log(sendDate)
    return this.http.post(environment.apiUrl + '/load-table', sendDate, {
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
