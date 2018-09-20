import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/observable'
import { Inventory } from '../../_models/inventory'
import { Http, Response } from "@angular/http";

@Injectable({
  providedIn: 'root'
})
export class PostDeleteDataService {

  constructor(private http: Http) { }

  addDeleteWithPromise(deleteVal: any, url: string): Promise<any> {
    return this.http.post("142.55.32.86:50281/api2/"+url, deleteVal).toPromise()
      .catch(this.handleErrorPromise);
  }
  private handleErrorPromise(error: Response | any) {
    console.error(error.message || error);
    return Promise.reject(error.message || error);
  }
}
