import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoadNumprodDataService {
  constructor(private http: HttpClient) {
    this.getJSON()
      .subscribe(data => {
        console.log(data);
      });
  }

  public getJSON(): any {
    return this.http.get('./assets/MOCK_DATA.json');
  }
}
