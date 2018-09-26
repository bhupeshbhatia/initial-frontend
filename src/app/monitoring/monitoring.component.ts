import { Component, OnInit, Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import * as c3 from 'c3';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.css']
})
export class MonitoringComponent implements OnInit {

  chart: any
  ngOnInit(){
    c3.generate(
      {
        data: {
          columns: [
            ['Total Product', 30, 200, 100, 400, 150, 250],
            ['Sold Product', 130, 100, 140, 200, 150, 50],
            ['Waste Product', 130, 100, 140, 200, 150, 50]
          ],
          type: 'bar',

        },
        bar: {
          width: {
            ratio: 0.5 // this makes bar width 50% of length between ticks
          }
          // or
          //width: 100 // this makes bar width 100px
        }
      }
    );
  }
}
