import { Component, OnInit } from '@angular/core';
import { LoadNumprodDataService } from "../services/load-numprod-data/load-numprod-data.service";
import { Chart } from 'chart.js';
import * as c3 from 'c3';

const avgprod: number[] = []
const weightdist: number[] = []
const avgprodweight: number[] = []

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit {
  constructor(private loadNumProdDataService: LoadNumprodDataService) { }

  totalChart: any
  soldChart: any
  distChart: any
  donationChart: any
  // this.loadNumProd.sendDate()
 date: any
  ngOnInit(): void {

    this.loadNumProdDataService.getJSON(3)
      .subscribe(data => {
        console.log(data)
        // this.chart.internal.config.axis_x_tick_values = data.dates
        // this.chart.flush()
        this.totalChart.load({
          columns: [
            ["Total Weight", data.total_weight],
            ["Sold Weight", data.sold_weight],
            ["Waste Weight", data.waste_weight]
          ]
        })

        this.donationChart.load({
          columns: [
            ["Total Weight", data.total_weight]
          ]
        })
      })
      this.loadChart()
  }

  changeAxis(dateArray: JSON): JSON {
    return dateArray
  }

  loadChart() {
    this.totalChart = c3.generate(
      {
        bindto: '#totalChart',
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
            }
          },
        }
      }
    );

    this.donationChart = c3.generate(
      {
        bindto: '#donationChart',
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
            }
          },
        }
      }
    );
  }

}
