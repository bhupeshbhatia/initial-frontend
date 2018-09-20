import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/observable'
import { Inventory } from '../../_models/inventory'
import { Http, Response } from "@angular/http";

@Injectable({
  providedIn: 'root'
})
export class PostInventoryDataService {

  constructor(private http: Http) { }

  addInventoryWithPromise(inventory: JSON, url: string): Promise<any> {
    return this.http.post("142.55.32.86:50281/api2/"+url, inventory).toPromise()
                   .catch(this.handleErrorPromise);
  }
    private handleErrorPromise (error: Response | any) {
	console.error(error.message || error);
	return Promise.reject(error.message || error);
    }

}
