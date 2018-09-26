import { Component, OnInit } from '@angular/core';
import { LoadNumprodDataService } from "../services/load-numprod-data/load-numprod-data.service";
import { LoadProdHourService } from "../services/load-prod-hour/load-prod-hour.service";
import { LoadWeightDistDataService } from "../services/load-weight-dist-data/load-weight-dist-data.service";
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
  constructor(private loadNumProdData: LoadNumprodDataService, private loadProdHourData: LoadProdHourService,
              private loadWeightDistData: LoadWeightDistDataService) { }

  totalChart: any
  soldChart: any
  distChart: any
  donationChart: any
  // this.loadNumProd.sendDate()
 date: any
  ngOnInit(): void {

    this.loadNumProdData.getJSON(3)
      .subscribe(data => {
        console.log(data)

        var obj = Object.keys(data)

        this.totalChart.load({
          columns: data
        })

        // obj.forEach(function(key){
        //   this.totalChart.load({
        //     columns: [
        //       ["Total Weight", data[key].total_weight],
        //       ["Sold Weight", data[key].sold_weight],
        //       ["Waste Weight", data[key].waste_weight]
        //     ]
        //   })
        // })





        // this.donationChart.load({
        //   columns: [
        //     ["Total Weight", data.total_weight]
        //   ]
        // })
      })
    // this.loadProdHourData.getJSON(3)
    //   .subscribe(data => {
    //     console.log(data)
    //     this.totalChart.load({
    //       columns: [
    //         ["Total Weight", data.total_weight],
    //         ["Sold Weight", data.sold_weight],
    //         ["Waste Weight", data.waste_weight]
    //       ]
    //     })
    //   })
    // this.loadWeightDistData.getJSON(3)
    //   .subscribe(data => {
    //     console.log(data)
    //     this.totalChart.load({
    //       columns: [
    //         ["Total Weight", data.total_weight],
    //         ["Sold Weight", data.sold_weight],
    //         ["Waste Weight", data.waste_weight]
    //       ]
    //     })
    //   })
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

    this.soldChart = c3.generate(
      {
        bindto: '#soldChart',
        data: {
          columns: [
          ],
          type: 'line',
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

    this.distChart = c3.generate(
      {
        bindto: '#distChart',
        data: {
          columns: [
          ],
          type: 'pie',
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
