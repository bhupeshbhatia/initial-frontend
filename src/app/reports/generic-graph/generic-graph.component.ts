import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../config'
import { SendDate } from '../../models'
import {Chart} from 'chart.js'

@Component({
  selector: 'app-generic-graph',
  templateUrl: './generic-graph.component.html',
  styleUrls: ['./generic-graph.component.css']
})
export class GenericGraphComponent implements OnInit {

  totalChart: any
  soldChart: any
  distChart: any
  donationChart: any
  date: any
  @ViewChild('arrival') arrival: ElementRef
  @ViewChild('total') total: ElementRef
  @ViewChild('average') average: ElementRef
  @Input() chartName: string
  @Input() type: string
  @Input() url: string

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  loadTotalGraph() {
    this.totalChart = new Chart('totalChart', {
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
              labelString: 'Weight(KG)'
            },
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });

    this.getJSON()
      .subscribe(dataArr => {
        console.log(dataArr);
        const metrics: any = [
          [],
          [],
          []
        ];
        // total_weight: 195, sold_weight: 58, waste_weight: 49
        Object.keys(dataArr)
          .forEach(k => {
            const weights = dataArr[k];
            const date = new Date(weights.dates * 1000).toDateString();
            this.totalChart.data.labels.push(date);
            this.total.nativeElement.innerHTML = weights.total_weight;
            metrics[0].push(weights.total_weight);
            metrics[1].push(weights.sold_weight);
            metrics[2].push(weights.waste_weight);
          });

        this.totalChart.data.datasets.forEach((dataset, index) =>
          dataset.data = dataset.data.concat(metrics[index])
        );

        this.totalChart.update();

        // Moving Graph
      });


    setInterval(() => {
      this.getToday()
        .subscribe(newDate => {
          const newMetrics: any = [
            [],
            [],
            []
          ];
          console.log(newDate)
          Object.keys(newDate)
            .forEach(k => {
              const weights = newDate[k];
              const date = new Date(weights.dates * 1000).toDateString();
              this.totalChart.data.labels.push(date);
              this.total.nativeElement.innerHTML = weights.total_weight;
              newMetrics[0].push(weights.total_weight);
              newMetrics[1].push(weights.sold_weight);
              newMetrics[2].push(weights.waste_weight);
            });
        })
      // this.totalChart.data.datasets.forEach((dataset, index) => {
      //   console.log(index)
      //   const metric = dataset.data.shift();
      //   dataset.data.push(newMetrics[index]);
      // });
      this.totalChart.update();
    }, 60000);
  }

  getJSON(): any {
    var sendDates = []

    const sendDate = new SendDate()
    sendDate.end_date = this.getDays(1)[0]
    sendDate.start_date = this.getDays(1)[1]

    const sendDate2 = new SendDate();
    sendDate2.end_date = this.getDays(2)[0]
    sendDate2.start_date = this.getDays(2)[1]

    const sendDate3 = new SendDate()
    sendDate3.end_date = this.getDays(3)[0]
    sendDate3.start_date = this.getDays(3)[1]

    const sendDate4 = new SendDate()
    sendDate4.end_date = this.getDays(4)[0]
    sendDate4.start_date = this.getDays(4)[1]

    sendDates = [sendDate, sendDate2, sendDate3, sendDate4]


    return this.http.post(environment.apiUrl + '/total-inv', sendDates, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  getToday(): any {
    var sendDates = []

    const sendDate = new SendDate()
    sendDate.end_date = this.getDays(1)[0]
    // sendDate.start_date = this.getDays(0)[1]
    console.log(sendDate)
    sendDates = [sendDate]


    return this.http.post(environment.apiUrl + '/total-inv', sendDates, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  getDays(days?: number): Array<any> {
    let dates = []
    const end_date = Math.round((new Date().getTime() / 1000) + (86400 * days))
    const start_date = Math.round(new Date().getTime() / 1000) - (86400 * days)
    return dates = [
      end_date, start_date
    ]
  }
}
