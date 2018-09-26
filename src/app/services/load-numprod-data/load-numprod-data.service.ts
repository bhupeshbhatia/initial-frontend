import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaderResponse } from '@angular/common/http';
import { interval } from 'rxjs/observable/interval';
import { timer, pipe } from 'rxjs';
import { Observable } from "rxjs/observable";
import { switchMap, catchError } from 'rxjs/operators';

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

  public getJSON(): any{
   return this.http.get('./assets/MOCK_DATA.json');
  }

  // public getJSONPromise(timeData: JSON): Observable<HttpHeaderResponse> {
  //   return this.http.post<Response>(url, timeData,).pipe(
  //     tap(_ => console.log("date sent")),
  //     Response(),
  //     catchError()
  //   )
  // }

}
