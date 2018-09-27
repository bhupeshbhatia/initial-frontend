import { Component, OnInit } from '@angular/core';
import { LoadNumprodDataService } from "../services/load-numprod-data/load-numprod-data.service";
import { HttpClient } from '@angular/common/http';
import { LoadProdHourService } from "../services/load-prod-hour/load-prod-hour.service";
import { LoadWeightDistDataService } from "../services/load-weight-dist-data/load-weight-dist-data.service";
import { environment } from '../../config'
import { SendDate } from '../_models'
import Chart from 'chart.js';

const avgprod: number[] = []
const weightdist: number[] = []
const avgprodweight: number[] = []

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit {
  constructor(private http: HttpClient) {
    // this.checkData()
  }
  // constructor(
  //   private loadNumProdData: Load NumprodDataService,
  //   private loadProdHourData: LoadProdHourService,
  //   private loadWeightDistData: LoadWeightDistDataService
  // ) {}

  totalChart: any
  soldChart: any
  distChart: any
  donationChart: any
  // this.loadNumProd.sendDate()
  date: any

  getDays(days?:number): Array<any>{
    var dates = []
    var end_date = Math.round(new Date().getTime() / 1000)
    var start_date = Math.round(new Date().getTime() / 1000) - (86400 * days)
    return dates = [
      end_date, start_date
    ]
  }

  getJSON(days: number): any {

    var sendDates = []

    // for (let i = 0; i < days; i++) {
    //   var sendDate = new SendDate();
    //   sendDate.end_date = this.getDays()[0];
    //   sendDate.start_date = this.getDays(1)[1];
    // }

    var sendDate = new SendDate();
    sendDate.end_date = this.getDays()[0];
    sendDate.start_date = this.getDays(1)[1];

    var sendDate2 = new SendDate();
    sendDate2.end_date = this.getDays()[0];
    sendDate2.start_date = this.getDays(2)[1];

    var sendDate3 = new SendDate();
    sendDate3.end_date = this.getDays()[0];
    sendDate3.start_date = this.getDays(3)[1];

    var sendDate4 = new SendDate();
    sendDate4.end_date = this.getDays()[0];
    sendDate4.start_date = this.getDays(4)[1];

    sendDates = [sendDate, sendDate2, sendDate3, sendDate4]

    console.log("}}}}}}}}}}}}}}}}}}}}")
    console.log(sendDate)
    return this.http.post(environment.apiUrl + '/twsalewaste', sendDates, {
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  ngOnInit(): void {



  }

  changeAxis(dateArray: JSON): JSON {
    return dateArray
  }


  loadTotalGraph(){
    this.totalChart = new Chart("totalChart", {
      type: 'bar',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Total Weight',
            data: [],
            backgroundColor: 'rgba(255, 99, 132, 1)',
          },
          {
            label: 'Sold Weight',
            data: [],
            backgroundColor: 'rgba(25, 99, 132, 1)',
          },
          {
            label: 'Waste Weight',
            data: [],
            backgroundColor: 'rgba(125, 30, 255, 1)',
          }
        ]
      },
      options: {
        responsive: true,
        hover: {
          mode: 'dataset'
        },
        legend: {
          display: true
        },
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Date'
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Weight'
            },
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });

    this.getJSON(3).subscribe(dataArr => {
      console.log(dataArr)
      const metrics: any = [
        [],
        [],
        [],
      ]
      // total_weight: 195, sold_weight: 58, waste_weight: 49
      Object.keys(dataArr).forEach(k => {
        const weights = dataArr[k]
        const date = new Date(weights.dates).toDateString()
        this.totalChart.data.labels.push(date)
        metrics[0].push(weights.total_weight)
        metrics[1].push(weights.sold_weight)
        metrics[2].push(weights.waste_weight)
      })

      this.totalChart.data.datasets.forEach((dataset, index) =>
        dataset.data = dataset.data.concat(metrics[index])
      );
      this.totalChart.update()

      // Moving Graph
      setInterval(() => {
        this.totalChart.data.datasets.forEach((dataset, index) => {
          const metric = dataset.data.shift()
          dataset.data.push(metric + 1)
        });
        this.totalChart.update()
      }, 5000)
    })
  }

  loadSoldGraph(){
    this.totalChart = new Chart("totalChart", {
      type: 'bar',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Total Weight',
            data: [],
            backgroundColor: 'rgba(255, 99, 132, 1)',
          },
          {
            label: 'Sold Weight',
            data: [],
            backgroundColor: 'rgba(25, 99, 132, 1)',
          },
          {
            label: 'Waste Weight',
            data: [],
            backgroundColor: 'rgba(125, 30, 255, 1)',
          }
        ]
      },
      options: {
        responsive: true,
        hover: {
          mode: 'dataset'
        },
        legend: {
          display: true
        },
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Date'
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Weight'
            },
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });

    this.getJSON(3).subscribe(dataArr => {
      console.log(dataArr)
      const metrics: any = [
        [],
        [],
        [],
      ]
      // total_weight: 195, sold_weight: 58, waste_weight: 49
      Object.keys(dataArr).forEach(k => {
        const weights = dataArr[k]
        const date = new Date(weights.dates).toDateString()
        this.totalChart.data.labels.push(date)
        metrics[0].push(weights.total_weight)
        metrics[1].push(weights.sold_weight)
        metrics[2].push(weights.waste_weight)
      })

      this.totalChart.data.datasets.forEach((dataset, index) =>
        dataset.data = dataset.data.concat(metrics[index])
      );
      this.totalChart.update()

      // Moving Graph
      setInterval(() => {
        this.totalChart.data.datasets.forEach((dataset, index) => {
          const metric = dataset.data.shift()
          dataset.data.push(metric + 1)
        });
        this.totalChart.update()
      }, 5000)
    })
  }

}
