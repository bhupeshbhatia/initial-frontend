import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { LoadNumprodDataService } from "../../services/load-numprod-data/load-numprod-data.service";

const numprod: number[] = []
const avgprod: number[] = []
const weightdist: number[] = []
const avgprodweight: number[] = []

@Component({
  selector: 'app-inv-dash',
  templateUrl: './inv-dash.component.html'
})

export class InvDashComponent implements OnInit {
  constructor(private loadNumProdDataService: LoadNumprodDataService) { }

  public gradientStroke;
  public chartColor;
  public canvas: any;
  public ctx;
  public gradientFill;
  public gradientChartOptionsConfiguration: any;
  public gradientChartOptionsConfigurationWithNumbersAndGrid: any;

  public activeUsersChartType;
  public activeUsersChartData: Array<any>;
  public activeUsersChartOptions: any;
  public activeUsersChartLabels: Array<any>;
  public activeUsersChartColors: Array<any>

  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
  public hexToRGB(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
      return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
      return "rgb(" + r + ", " + g + ", " + b + ")";
    }
  }

  ngOnInit():void {
    // this.loadNumProdDataService.getJSON()
    //   .subscribe(data => {
    //     console.log(data)
    //     numprod = data
    //     console.log(numprod[0])
    // })

    this.chartColor = "#FFFFFF";

    var cardStatsMiniLineColor = "#fff",
      cardStatsMiniDotColor = "#fff";

    this.canvas = document.getElementById("numProducts");
    this.ctx = this.canvas.getContext("2d");

    this.gradientStroke = this.ctx.createLinearGradient(500, 0, 100, 0);
    this.gradientStroke.addColorStop(0, '#80b6f4');
    this.gradientStroke.addColorStop(1, this.chartColor);

    this.gradientFill = this.ctx.createLinearGradient(0, 170, 0, 50);
    this.gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    this.gradientFill.addColorStop(1, "rgba(249, 99, 59, 0.40)");

   var myChart = new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        datasets: [

          {
            label: "# of Products",
            borderColor: '#fcc468',
            fill: true,
            backgroundColor: '#fcc468',
            hoverBorderColor: '#fcc468',
            borderWidth: 8,
          },
          {
            label: "Time(H)",
            borderColor: '#4cbdd7',
            fill: true,
            backgroundColor: '#4cbdd7',
            hoverBorderColor: '#4cbdd7',
            borderWidth: 8,
            data: [80, 140, 50, 120, 50, 150, 60, 130, 50, 130, 150, 100, 110, 80, 140, 50, 140, 50, 110, 150],
          }
        ]
      },
      options: {

        tooltips: {
          tooltipFillColor: "rgba(0,0,0,0.5)",
          tooltipFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
          tooltipFontSize: 14,
          tooltipFontStyle: "normal",
          tooltipFontColor: "#fff",
          tooltipTitleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
          tooltipTitleFontSize: 14,
          tooltipTitleFontStyle: "bold",
          tooltipTitleFontColor: "#fff",
          tooltipYPadding: 6,
          tooltipXPadding: 6,
          tooltipCaretSize: 8,
          tooltipCornerRadius: 6,
          tooltipXOffset: 10,
        },


        legend: {

          display: true,
          position: 'bottom'
        },
        scales: {

          yAxes: [{
            ticks: {
              fontColor: "#9f9f9f",
              fontStyle: "bold",
              beginAtZero: true,
              maxTicksLimit: 5,
              padding: 20
            },
            gridLines: {
              zeroLineColor: "transparent",
              display: true,
              drawBorder: false,
              color: '#9f9f9f',
            }

          }],
          xAxes: [{
            barPercentage: 0.4,
            gridLines: {
              zeroLineColor: "white",
              display: true,

              drawBorder: false,
              color: 'transparent',
            },
            ticks: {
              padding: 20,
              fontColor: "#9f9f9f",
              fontStyle: "bold"
            }
          }]
        }
      }
    });


    this.canvas = document.getElementById("avgNumProds");
    this.ctx = this.canvas.getContext("2d");

    this.gradientStroke = this.ctx.createLinearGradient(500, 0, 100, 0);
    this.gradientStroke.addColorStop(0, '#80b6f4');
    this.gradientStroke.addColorStop(1, this.chartColor);

    this.gradientFill = this.ctx.createLinearGradient(0, 170, 0, 50);
    this.gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    this.gradientFill.addColorStop(1, "rgba(249, 99, 59, 0.40)");

    var myChart = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        datasets: [

          {
            label: "Avg. # of products",
            borderColor: '#fcc468',
            fill: false,
            backgroundColor: '#fcc468',
            hoverBorderColor: '#fcc468',
            borderWidth: 1,
            data: [100, 120, 80, 100, 90, 130, 110, 100, 80, 110, 130, 140, 130, 120, 130, 80, 100, 90, 120, 130],
          },
          {
            label: "Time(H)",
            borderColor: '#4cbdd7',
            fill: false,
            backgroundColor: '#4cbdd7',
            hoverBorderColor: '#4cbdd7',
            borderWidth: 1,
            data: [80, 140, 50, 120, 50, 150, 60, 130, 50, 130, 150, 100, 110, 80, 140, 50, 140, 50, 110, 150],
          }
        ]
      },
      options: {

        tooltips: {
          tooltipFillColor: "rgba(0,0,0,0.5)",
          tooltipFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
          tooltipFontSize: 14,
          tooltipFontStyle: "normal",
          tooltipFontColor: "#fff",
          tooltipTitleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
          tooltipTitleFontSize: 14,
          tooltipTitleFontStyle: "bold",
          tooltipTitleFontColor: "#fff",
          tooltipYPadding: 6,
          tooltipXPadding: 6,
          tooltipCaretSize: 8,
          tooltipCornerRadius: 6,
          tooltipXOffset: 10,
        },


        legend: {

          display: true,
          position: 'bottom'
        },
        scales: {

          yAxes: [{
            ticks: {
              fontColor: "#9f9f9f",
              fontStyle: "bold",
              beginAtZero: true,
              maxTicksLimit: 5,
              padding: 20
            },
            gridLines: {
              zeroLineColor: "transparent",
              display: true,
              drawBorder: false,
              color: '#9f9f9f',
            }

          }],
          xAxes: [{
            barPercentage: 0.4,
            gridLines: {
              zeroLineColor: "white",
              display: false,

              drawBorder: false,
              color: 'transparent',
            },
            ticks: {
              padding: 20,
              fontColor: "#9f9f9f",
              fontStyle: "bold"
            }
          }]
        }
      }
    });

    Chart.pluginService.register({
      beforeDraw: function (chart) {
        if (chart.config.options.elements.center) {
          //Get ctx from string
          var ctx = chart.chart.ctx;

          //Get options from the center object in options
          var centerConfig = chart.config.options.elements.center;
          var fontStyle = centerConfig.fontStyle || 'Arial';
          var txt = centerConfig.text;
          var color = centerConfig.color || '#000';
          var sidePadding = centerConfig.sidePadding || 20;
          var sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2)
          //Start with a base font of 30px
          ctx.font = "30px " + fontStyle;

          //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
          var stringWidth = ctx.measureText(txt).width;
          var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

          // Find out how much the font can grow in width.
          var widthRatio = elementWidth / stringWidth;
          var newFontSize = Math.floor(30 * widthRatio);
          var elementHeight = (chart.innerRadius * 2);

          // Pick a new font size so it will not be larger than the height of label.
          var fontSizeToUse = Math.min(newFontSize, elementHeight);

          //Set font settings to draw it correctly.
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
          var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
          ctx.font = fontSizeToUse + "px " + fontStyle;
          ctx.fillStyle = color;

          //Draw text in center
          ctx.fillText(txt, centerX, centerY);
        }
      }
    });

    this.canvas = document.getElementById("weightDist");
    this.ctx = this.canvas.getContext("2d");

    var myChart = new Chart(this.ctx, {
      type: 'pie',
      data: {
        labels: ['Apples', 'Oranges', 'Bananas'],
        datasets: [{
          label: "Fruits",
          pointRadius: 0,
          pointHoverRadius: 0,
          backgroundColor: [
            '#e3e3e3',
            '#4acccd',
            '#fcc468'
          ],
          borderWidth: 0,
          data: [1, 2, 3]
        }]
      },
      options: {

        legend: {

          display: true,
          position: 'bottom'
        },

        tooltips: {
          enabled: true
        },

        scales: {
          yAxes: [{

            ticks: {
              display: false
            },
            gridLines: {
              drawBorder: false,
              zeroLineColor: "transparent",
              color: 'rgba(255,255,255,0.05)'
            }

          }],

          xAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(255,255,255,0.1)',
              zeroLineColor: "transparent"
            },
            ticks: {
              display: false,
            }
          }]
        },
      }
    });

    Chart.pluginService.register({
      beforeDraw: function (chart) {
        if (chart.config.options.elements.center) {
          //Get ctx from string
          var ctx = chart.chart.ctx;

          //Get options from the center object in options
          var centerConfig = chart.config.options.elements.center;
          var fontStyle = centerConfig.fontStyle || 'Arial';
          var txt = centerConfig.text;
          var color = centerConfig.color || '#000';
          var sidePadding = centerConfig.sidePadding || 20;
          var sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2)
          //Start with a base font of 30px
          ctx.font = "30px " + fontStyle;

          //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
          var stringWidth = ctx.measureText(txt).width;
          var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

          // Find out how much the font can grow in width.
          var widthRatio = elementWidth / stringWidth;
          var newFontSize = Math.floor(30 * widthRatio);
          var elementHeight = (chart.innerRadius * 2);

          // Pick a new font size so it will not be larger than the height of label.
          var fontSizeToUse = Math.min(newFontSize, elementHeight);

          //Set font settings to draw it correctly.
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
          var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
          ctx.font = fontSizeToUse + "px " + fontStyle;
          ctx.fillStyle = color;

          //Draw text in center
          ctx.fillText(txt, centerX, centerY);
        }
      }
    });

    this.canvas = document.getElementById("avgSoldWeight");
    this.ctx = this.canvas.getContext("2d");

    this.gradientStroke = this.ctx.createLinearGradient(500, 0, 100, 0);
    this.gradientStroke.addColorStop(0, '#80b6f4');
    this.gradientStroke.addColorStop(1, this.chartColor);

    this.gradientFill = this.ctx.createLinearGradient(0, 170, 0, 50);
    this.gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    this.gradientFill.addColorStop(1, "rgba(249, 99, 59, 0.40)");

    var myChart = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        datasets: [

          {
            label: "Average Product sold by weight",
            borderColor: '#fcc468',
            fill: false,
            backgroundColor: '#fcc468',
            hoverBorderColor: '#fcc468',
            borderWidth: 1,
            data: [100, 120, 80, 100, 90, 130, 110, 100, 80, 110, 130, 140, 130, 120, 130, 80, 100, 90, 120, 130],
          },
          {
            label: "Time(H)",
            borderColor: '#4cbdd7',
            fill: false,
            backgroundColor: '#4cbdd7',
            hoverBorderColor: '#4cbdd7',
            borderWidth: 1,
            data: [80, 140, 50, 120, 50, 150, 60, 130, 50, 130, 150, 100, 110, 80, 140, 50, 140, 50, 110, 150],
          }
        ]
      },
      options: {

        tooltips: {
          tooltipFillColor: "rgba(0,0,0,0.5)",
          tooltipFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
          tooltipFontSize: 14,
          tooltipFontStyle: "normal",
          tooltipFontColor: "#fff",
          tooltipTitleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
          tooltipTitleFontSize: 14,
          tooltipTitleFontStyle: "bold",
          tooltipTitleFontColor: "#fff",
          tooltipYPadding: 6,
          tooltipXPadding: 6,
          tooltipCaretSize: 8,
          tooltipCornerRadius: 6,
          tooltipXOffset: 10,
        },


        legend: {

          display: true,
          position: 'bottom'
        },
        scales: {

          yAxes: [{
            ticks: {
              fontColor: "#9f9f9f",
              fontStyle: "bold",
              beginAtZero: true,
              maxTicksLimit: 5,
              padding: 20
            },
            gridLines: {
              zeroLineColor: "transparent",
              display: true,
              drawBorder: false,
              color: '#9f9f9f',
            }

          }],
          xAxes: [{
            barPercentage: 0.4,
            gridLines: {
              zeroLineColor: "white",
              display: false,

              drawBorder: false,
              color: 'transparent',
            },
            ticks: {
              padding: 20,
              fontColor: "#9f9f9f",
              fontStyle: "bold"
            }
          }]
        }
      }
    });

    Chart.pluginService.register({
      beforeDraw: function (chart) {
        if (chart.config.options.elements.center) {
          //Get ctx from string
          var ctx = chart.chart.ctx;

          //Get options from the center object in options
          var centerConfig = chart.config.options.elements.center;
          var fontStyle = centerConfig.fontStyle || 'Arial';
          var txt = centerConfig.text;
          var color = centerConfig.color || '#000';
          var sidePadding = centerConfig.sidePadding || 20;
          var sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2)
          //Start with a base font of 30px
          ctx.font = "30px " + fontStyle;

          //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
          var stringWidth = ctx.measureText(txt).width;
          var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

          // Find out how much the font can grow in width.
          var widthRatio = elementWidth / stringWidth;
          var newFontSize = Math.floor(30 * widthRatio);
          var elementHeight = (chart.innerRadius * 2);

          // Pick a new font size so it will not be larger than the height of label.
          var fontSizeToUse = Math.min(newFontSize, elementHeight);

          //Set font settings to draw it correctly.
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
          var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
          ctx.font = fontSizeToUse + "px " + fontStyle;
          ctx.fillStyle = color;

          //Draw text in center
          ctx.fillText(txt, centerX, centerY);
        }
      }
    });

  }

}
