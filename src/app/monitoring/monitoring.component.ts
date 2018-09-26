import { Component, OnInit, Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import * as c3 from 'c3';
import { LoadNumprodDataService } from '../services/load-numprod-data/load-numprod-data.service';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.css']
})
export class MonitoringComponent implements OnInit {

constructor(private loadNumProd: LoadNumprodDataService){}

  chart: any
  ngOnInit(){
    // this.loadNumProd.sendDate()
    // this.loadNumProd.getJSON()
    //   .subscribe(data => {
    //     console.log(data)
    //     this.chart.load({
    //       columns: [
    //         ["Total Weight",data.total_weight],
    //         ["Sold Weight",data.sold_weight],
    //         ["Waste Weight", data.waste_weight]
    //     ]
    //   })
    //   })

    this.loadChart()
    // setTimeout(()=>{
    //   this.chart.load({
    //     columns: [
    //       ['data3', 130, -150, 200, 300, -200, 100]
    //     ]
    //   });
    // },5000
    // )
  }

  loadChart(){

    this.chart = c3.generate(
      {
        data: {
          columns: [
          ],
          type: 'bar',
        },
        bar: {
          width: {
            ratio: 0.5
          }
        },
        axis: {
          y: {
            label: { // ADD
              text: '# of products',
              position: 'outer-middle'
            }
          },
          x: {
            label: { // ADD
              text: 'Date',
              position: 'outer-middle'
            },
            type: 'category',
            categories: ['todays date']
          },
        }
      }
    );
  }

}
