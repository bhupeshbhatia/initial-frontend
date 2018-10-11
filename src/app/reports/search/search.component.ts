import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { SearchDataToTableService } from "../../services/search-data-to-table/search-data-to-table.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Input() endPoint: number
  @ViewChild('sku') sku: ElementRef
  @ViewChild('name') name: ElementRef
  @ViewChild('start') start: ElementRef
  @ViewChild('end') end: ElementRef

  constructor(private http: HttpClient, private searchData: SearchDataToTableService) { }

  ngOnInit() {
  }

  onSubmit() {

      const sku = this.sku.nativeElement.value
      const name = this.name.nativeElement.value
      const start = this.start.nativeElement.value
      const end = this.end.nativeElement.value
      const unixStart = new Date(start).getTime() / 1000
      const unixEnd = new Date(end).getTime() / 1000
      let resource;

    var searchArray = [{}, {}, {}]

     if(sku != ""){
       searchArray[0]["field"] = "sku"
       searchArray[0]["type"] = "int"
       searchArray[0]["equal"] = sku
     }
     if (name != "") {
       searchArray[1]["field"] = "name"
       searchArray[1]["type"] = "string"
       searchArray[1]["equal"] = name
     }
    if (!isNaN(unixStart) && !isNaN(unixEnd)) {
       searchArray[2]["field"] = "timestamp"
       searchArray[2]["type"] = "int"
       searchArray[2]["upper_limit"] = unixStart
       searchArray[2]["lower_limit"] = unixEnd
     }
    console.log(Object.keys(searchArray[0]).length)
    if (Object.keys(searchArray[0]).length == 0) {
      searchArray.splice(0,1)
    }
    if (Object.keys(searchArray[1]).length == 0)
    {
      searchArray.splice(1,2)
    }
    if (Object.keys(searchArray[0]).length == 0) {
      searchArray.splice(2,3)
    }

    resource = {
      inventory: searchArray
    }

      if(this.endPoint == 1){

        console.log(this.http)
        this.http.post('http://10.80.3.58:8080/met-report', resource, {
          headers: {
            "Content-Type": "application/json"
          }
        })
          .toPromise()
          // .then(d => this.data)
          .then((data: any) => {
            console.log(data)
            if (data !== null) {
              this.searchData.setMetData(data)
            }
          })

        // console.log(this.http)
        // this.http.post('http://10.80.3.58:8080/inv-report', resource, {
        //   headers: {
        //     "Content-Type": "application/json"
        //   }
        // })
        //   .toPromise()
        //   // .then(d => this.data)
        //   .then((data: any) => {
        //     console.log(data)
        //     if (data !== null) {
        //       console.log(data)
        //       this.searchData.setInvData("Inv"+data)
        //     }
        //   })

        console.log(this.http)
        this.http.post('http://10.80.3.58:8080/dev-report', resource, {
          headers: {
            "Content-Type": "application/json"
          }
        })
          .toPromise()
          // .then(d => this.data)
          .then((data: any) => {
            console.log(data)
            if (data !== null) {
              this.searchData.setDevData(data)
            }
          })


      }
  }
}
