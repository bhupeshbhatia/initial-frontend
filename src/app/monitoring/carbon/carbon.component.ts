import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as environment from '../../../config'
import { SendDate } from '../../_models/send-date'
import Chart from 'chart.js';

@Component({
  selector: 'app-carbon',
  templateUrl: './carbon.component.html',
  styleUrls: ['./carbon.component.css']
})
export class CarbonComponent implements OnInit {

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
  // @ViewChild("arrival") arrival: ElementRef
  // @ViewChild("total") total: ElementRef
  // @ViewChild("average") average: ElementRef

  ngOnInit(): void {
    this.loadCarbonGraph()
  }

  getDays(days?: number): Array<any> {
    var dates = []
    var end_date = Math.round(new Date().getTime() / 1000) + (86400 * days)
    var start_date = Math.round(new Date().getTime() / 1000) - (86400 * days)
    return dates = [
      end_date, start_date
    ]
  }

  getJSON(): any {
    var sendDates = []

    var sendDate = new SendDate();
    sendDate.end_date = this.getDays(1)[0];

    sendDates = [sendDate]

    console.log("}}}}}}}}}}}}}}}}}}}}")
    console.log(sendDates)
    return this.http.post(environment.apiUrl + '/sen-perday', sendDates, {
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  loadCarbonGraph() {
    this.soldChart = new Chart("soldChart", {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Average Products',
            data: [],
            backgroundColor: 'rgba(255, 99, 132, 1)',
            fill: "true"
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

    this.getJSON().subscribe(dataArr => {
      console.log(dataArr)
      const metrics: any = [
        []
      ]
      // total_weight: 195, sold_weight: 58, waste_weight: 49
      Object.keys(dataArr).forEach(k => {
        const prods = dataArr[k]
        const date = new Date(prods.dates).toDateString()
        this.soldChart.data.labels.push(date)
        metrics[0].push(prods.total_weight)
      })

      this.soldChart.data.datasets.forEach((dataset, index) =>
        dataset.data = dataset.data.concat(metrics[index])
      );
      this.totalChart.update()

      // Moving Graph
      setInterval(() => {
        this.soldChart.data.datasets.forEach((dataset, index) => {
          const metric = dataset.data.shift()
          dataset.data.push(metric + 1)
        });
        this.soldChart.update()
      }, 5000)
    })
  }

  changeAxis(dateArray: JSON): JSON {
    return dateArray
  }

}
