import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/observable'
import { Inventory } from '../../_models/inventory'
import { Http, Response } from "@angular/http";

@Injectable({
  providedIn: 'root'
})
export class PostDDateDataService {

  constructor(private http: Http) { }

  addDateWithPromise(date: JSON, url: string): Promise<any> {
    return this.http.post("localhost:8080"+url, date).toPromise()
      .catch(this.handleErrorPromise);
  }
  private handleErrorPromise(error: Response | any) {
    console.error(error.message || error);
    return Promise.reject(error.message || error);
  }

}
