import { Component, OnInit, ElementRef, ViewChild } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from 'config'
import { SendDate } from '../_models'
import Chart from 'chart.js'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit {


  totalChart: any
  soldChart: any
  distChart: any
  donationChart: any
  date: any

  @ViewChild('arrival') arrival: ElementRef
  @ViewChild('total') total: ElementRef
  @ViewChild('average') average: ElementRef

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
     this.loadTotalGraph()
     this.loadSoldGraph()
     this.loadDistGraph()
     this.loadDonationGraph()
  }


  getDays(days?:number): Array<any>{
    let dates = []
    const end_date = Math.round((new Date().getTime() / 1000) + (86400 * days))
    const start_date = Math.round(new Date().getTime() / 1000) - (86400 * days)
    return dates = [
      end_date, start_date
    ]
  }

  getJSON(): any {
    var sendDates = []

    const sendDate = new SendDate()
    sendDate.end_date = this.getDays(1)[0]
    sendDate.start_date = this.getDays(1)[1]

    const sendDate2 = new SendDate()
    sendDate2.end_date = this.getDays(2)[0]
    sendDate2.start_date = this.getDays(2)[1]

    const sendDate3 = new SendDate()
    sendDate3.end_date = this.getDays(3)[0]
    sendDate3.start_date = this.getDays(3)[1]

    const sendDate4 = new SendDate()
    sendDate4.end_date = this.getDays(4)[0]
    sendDate4.start_date = this.getDays(4)[1]

    sendDates = [sendDate, sendDate2, sendDate3, sendDate4]


    return this.http.post(environment.apiUrl + '/twsalewaste', sendDates, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  getSoldJSON(): any {

    var sendDates = []

    const sendDate = new SendDate()
    sendDate.end_date = this.getDays(1)[0]
    sendDate.start_date = this.getDays(1)[1]

    const sendDate2 = new SendDate()
    sendDate2.end_date = this.getDays(2)[0]
    sendDate2.start_date = this.getDays(2)[1]

    const sendDate3 = new SendDate()
    sendDate3.end_date = this.getDays(3)[0]
    sendDate3.start_date = this.getDays(3)[1]

    const sendDate4 = new SendDate()
    sendDate4.end_date = this.getDays(4)[0]
    sendDate4.start_date = this.getDays(4)[1]

    sendDates = [sendDate, sendDate2, sendDate3, sendDate4]

    console.log("}}}}}}}}}}}}}}}}}}}}")
    console.log(sendDate)
    return this.http.post(environment.apiUrl + '/perhr-sale', sendDates, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  getDistJSON(): any {


    return this.http.get(environment.apiUrl + '/dist-weight', {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  changeAxis(dateArray: JSON): JSON {
    return dateArray
  }


  loadTotalGraph(): void{
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
              labelString: 'Weight'
            },
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    })

    this.getJSON()
      .subscribe(dataArr => {
      console.log(dataArr)
      const metrics: any = [
        [],
        [],
        []
      ]
      // total_weight: 195, sold_weight: 58, waste_weight: 49
      Object.keys(dataArr)
      .forEach(k => {
        const weights = dataArr[k]
        const date = new Date(weights.dates).toDateString()
        this.totalChart.data.labels.push(date)
        this.total.nativeElement.innerHTML = weights.total_weight
        metrics[0].push(weights.total_weight)
        metrics[1].push(weights.sold_weight)
        metrics[2].push(weights.waste_weight)
      })

      this.totalChart.data.datasets.forEach((dataset, index) =>
        dataset.data = dataset.data.concat(metrics[index])
      )
      this.totalChart.update()

      // Moving Graph
      setInterval(() => {
        this.totalChart.data.datasets.forEach((dataset, index) => {
          const metric = dataset.data.shift()
          dataset.data.push(metric + 1)
        })
        this.totalChart.update()
      }, 5000)
    })
  }

  loadSoldGraph(){
    this.soldChart = new Chart("soldChart", {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Average Products',
            data: [],
            backgroundColor: 'rgba(255, 99, 132, 1)',
            fill: false
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
    })

    this.getSoldJSON().subscribe(dataArr => {
      console.log(dataArr)
      const metrics: any = [
        []
      ]
      // total_weight: 195, sold_weight: 58, waste_weight: 49
      Object.keys(dataArr).forEach(k => {
        const prods = dataArr[k]
        const date = new Date(prods.dates).toDateString()
        this.soldChart.data.labels.push(date)
        metrics[0].push(prods.sold_weight)
      })

      this.soldChart.data.datasets.forEach((dataset, index) =>
        dataset.data = dataset.data.concat(metrics[index])
      )
      this.soldChart.update()

      // Moving Graph
      setInterval(() => {
        this.soldChart.data.datasets.forEach((dataset, index) => {
          const metric = dataset.data.shift()
          dataset.data.push(metric + 1)
        })
        this.soldChart.update()
      }, 5000)
    })
  }

  loadDistGraph() {
    this.distChart = new Chart("distChart", {
      type: 'pie',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Fruit',
            data: [],
            backgroundColor: ['#001f3f', '#0074D9', '#7FDBFF', '#39CCCC', '#FFCC00', '##FFAC00', '#FF0000', '#FF4136', '#FF851B'],
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
        }
        // scales: {
        //   xAxes: [{
        //     display: true,
        //     scaleLabel: {
        //       display: true,
        //       labelString: 'Date'
        //     }
        //   }],
        //   yAxes: [{
        //     display: true,
        //     scaleLabel: {
        //       display: true,
        //       labelString: 'Weight'
        //     },
        //     ticks: {
        //       beginAtZero: true
        //     }
        //   }]
        // }
      }
    })

    this.getDistJSON().subscribe(dataArr => {
      console.log(dataArr)
      const metrics: any = [
        []
      ]
      // total_weight: 195, sold_weight: 58, waste_weight: 49
      Object.keys(dataArr).forEach(k => {
        const prods = dataArr[k]
        // const date = new Date(prods.dates).toDateString()
        this.distChart.data.labels.push(prods.prod_name)
        metrics[0].push(prods.prod_weight)
      })

      this.distChart.data.datasets.forEach((dataset, index) =>
        dataset.data = dataset.data.concat(metrics[index])
      )
      this.distChart.update()

      // Moving Graph
      setInterval(() => {
        this.distChart.data.datasets.forEach((dataset, index) => {
          const metric = dataset.data.shift()
          dataset.data.push(metric + 1)
        })
        this.distChart.update()
      }, 5000)
    })
  }

  loadDonationGraph() {
    this.donationChart = new Chart("donationChart", {
      type: 'bar',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Donation',
            data: [],
            backgroundColor: 'rgba(255, 99, 132, 1)',
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
    })

    this.getJSON().subscribe(dataArr => {
      console.log(dataArr)
      const metrics: any = [
        []
      ]
      // total_weight: 195, sold_weight: 58, waste_weight: 49
      Object.keys(dataArr).forEach(k => {
        const donations = dataArr[k]
        const date = new Date(donations.dates).toDateString()
        this.donationChart.data.labels.push(date)
        metrics[0].push(donations.donate_weight)
      })

      this.donationChart.data.datasets.forEach((dataset, index) =>
        dataset.data = dataset.data.concat(metrics[index])
      )
      this.donationChart.update()

      // Moving Graph
      setInterval(() => {
        this.donationChart.data.datasets.forEach((dataset, index) => {
          const metric = dataset.data.shift()
          dataset.data.push(metric + 1)
        })
        this.donationChart.update()
      }, 5000)
    })
  }

}
