import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs/observable'
// import { InventoryModel } from '../../Models/inventory.model'

@Injectable({
  providedIn: 'root'
})
export class LoadInventoryJsonService {

  constructor(private http: HttpClient) {
    this.getJSON()
      .subscribe(data => {
        console.log(data);
      });
  }

  public getJSON(): any {
    return this.http.get('./assets/food-items.JSON');
  }
}
