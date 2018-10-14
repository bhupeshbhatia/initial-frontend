import { Component, OnInit, ElementRef, ViewChild } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../config'
import { SendDate } from '../../models'
import { Chart } from 'chart.js'
import * as jspdf from 'jspdf';
import * as html2canvas from 'html2canvas';
import { DatePipe } from '@angular/common';
import MockUtils from '../mocks'

@Component({
  selector: 'app-inventory-report',
  templateUrl: './inventory-report.component.html',
  styleUrls: ['./inventory-report.component.css']
})
export class InventoryReportComponent implements OnInit {

  data: any = [1, 59, 68]
  testData: string
  totalChart: any
  ethyChart: any
  distChart: any
  donationChart: any
  date: Date = new Date()
  @ViewChild('arrival') arrival: ElementRef
  @ViewChild('total') total: ElementRef
  @ViewChild('average') average: ElementRef

  constructor(private http: HttpClient) {
    // this.searchData.getInvData().subscribe(data => {
    //   console.log(data)
    //   this.testData = data
    //   // console.log(this.testData)
    // })
  }

  ngOnInit() {
    this.loadInvGraph()
  }

  loadInvGraph() {
    console.log("7&&&&&&&&&&&&&&&&&&&")
    const arr2 = JSON.parse(localStorage.getItem("arr2"))
    console.log(arr2.map(e => {
      return e.Avg_Total_Weight
    }))
    var mock = new MockUtils()
    mock.genInvData()
    // console.log(mock.genFloat(30, 90))
    // this.ethyData = mock.genFloat(30, 90)
    // this.dataSource.data = this.ethyData
    this.ethyChart = new Chart('inventory', {
      type: 'bar',
      // data: {
      //   datasets: [
      //     {
      //       label: 'Ethylene level',
      //       data: this.data,
      //       backgroundColor: 'rgba(255, 99, 132, 1)',
      //       fill: false
      //     }
      //   ]
      // },
      // options: {
      //   responsive: true,
      //   hover: {
      //     mode: 'dataset'
      //   },
      //   legend: {
      //     display: true
      //   },
      //   scales: {
      //     xAxes: [{
      //       display: true,
      //       scaleLabel: {
      //         display: true,
      //         labelString: 'Period'
      //       }
      //     }],
      //     yAxes: [{
      //       display: true,
      //       scaleLabel: {
      //         display: true,
      //         labelString: 'PPM'
      //       },
      //       ticks: {
      //         beginAtZero: true
      //       }
      //     }]
      //   }
      // }


      data: {
        labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        datasets: [{
          label: 'Avg. Total Weight',
          data: arr2.map(e => {
            console.log(parseFloat(e.Avg_Total_Weight))
            return parseFloat(e.Avg_Total_Weight)
          }),
          backgroundColor: "rgba(153,255,51,0.4)"
        },
          {
            label: 'Avg. Sold Weight',
            data: arr2.map(e => {
              console.log(parseFloat(e.Avg_Sold_Weight))
              return parseFloat(e.Avg_Sold_Weight)
            }),
            backgroundColor: "rgba(153,25,51,0.4)"
          }]
      }
    });

    // this.getJSON().subscribe(dataArr => {
    //   console.log(dataArr);
    //   const metrics: any = [
    //     []
    //   ];
    //   // total_weight: 195, sold_weight: 58, waste_weight: 49
    //   Object.keys(dataArr).forEach(k => {
    //     const prods = dataArr[k];
    //     const date = new Date(prods.dates * 1000).toDateString();
    //     this.ethyChart.data.labels.push(date);
    //     metrics[0].push(prods.Ethylene);
    //   });

    //   this.ethyChart.data.datasets.forEach((dataset, index) =>
    //     dataset.data = dataset.data.concat(metrics[index])
    //   );
    //   this.ethyChart.update();

    //   // Moving Graph
    //   // setInterval(() => {
    //   //   this.ethyChart.data.datasets.forEach((dataset, index) => {
    //   //     const metric = dataset.data.shift();
    //   //     dataset.data.push(metric + 1);
    //   //   });
    //   //   this.ethyChart.update();
    //   // }, 40000);
    // });
  }

  getJSON(): any {

    // var sendDates = []

    // const sendDate = new SendDate()
    // sendDate.end_date = this.getDays(1)[0]
    // sendDate.start_date = this.getDays(1)[1]

    // let resource = `{
    //     login(start_date:"${sendDate.start_date}",end_date:"${sendDate.end_date}")
    //     {

    //     }
    //   }`

    // console.log(this.http)
    // this.http.post('http://162.212.158.16:30653/api', resource)
    //   .toPromise()
    //   // .then(d => this.data)
    //   .then((data: any) => {
    //     console.log(data.data)
    //     if (data.data !== null) {

    //     }
    //     // else {
    //     //   this.showError = true
    //     // }
    //   })

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

  captureScreen() {
    var data = document.getElementById('testCapture');
    console.log(data)
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('MYPdf.pdf'); // Generated PDF
    });
  }

}
