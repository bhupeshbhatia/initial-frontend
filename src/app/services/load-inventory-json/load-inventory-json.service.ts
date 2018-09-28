import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaderResponse } from '@angular/common/http'
import { environment } from 'config'
import { SendDate } from '../../_models'

@Injectable({
  providedIn: 'root'
})
export class LoadInventoryJsonService {
  constructor(private http: HttpClient) {
  }

  public getJSON(): any {


    var sendDate = new SendDate()
    sendDate.end_date = this.getDays(2)[0]
    console.log("}}}}}}}}}}}}}}}}}}}}")
    console.log(sendDate)
    return this.http.post(environment.apiUrl + '/load-table', sendDate, {
      headers: {
        "Content-Type": "application/json"
      }
    })
  }

  public getJsonTest(){
    return this.http.get('./assets/MOCK_DATA.json')
  }

  public getDays(days?: number): Array<any> {
    var dates = []
    var end_date = Math.round(new Date().getTime() / 1000) + (86400 * days)
    var start_date = Math.round(new Date().getTime() / 1000) - (86400 * days)
    return dates = [
      end_date, start_date
    ]
  }

  public getSearchJSON(query, field): any {

    var search = {
          search_key: field,
          search_val: query
    }

    console.log("}}}}}}}}}}}}}}}}}}}}")
    console.log(search)
    return this.http.post(environment.apiUrl + '/search-table', search, {
      headers: {
        "Content-Type": "application/json"
      }
    })
  }

  public deleteRow(item_id): any {

    var item = [{
        item_id: item_id
    }]
    console.log("}}}}}}}}}}}}}}}}}}}}")
    console.log(item)
    return this.http.post(environment.apiUrl + '/delete-product', item, {
      headers: {
        "Content-Type": "application/json"
      }
    })
  }

  public updateRow(obj: any): any {

    console.log("}}}}}}}}}}}}}}}}}}}}")
    console.log(obj)
    this.http.post(environment.apiUrl + '/update-product', obj)
      .toPromise()
      .then((data: any) => {
        console.log(data)
      })

  }


  public addProd(obj: any): any {

    console.log("}}}}}}}}}}}}}}}}}}}}")
    console.log(obj)
    this.http.post(environment.apiUrl+'/add-product', obj)
    .toPromise()
    .then((data: any) => {
    })
  }

}
