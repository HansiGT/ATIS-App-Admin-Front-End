import { Component, OnInit } from '@angular/core';
import { PredictionService } from '../prediction.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'prediction',
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.css']
})
export class PredictionComponent implements OnInit {
  value = 0;
  initData = [1,1,1,1,1,1];
  chart = new Chart('canvas', {
    type: 'bar',
    data: {
        labels: ["8:00 - 9:30", "9:45 - 11:15", "11:30 - 13:00",
         "14:00 - 15:30", "15:45 - 17:15", "17:30 - 19:00"],
        datasets: [{
            label: '# von belegten Plätzen',
            data: this.initData,
            backgroundColor: [
                'rgb(102, 16, 242)',
            ],
            borderColor: [
                'rgb(102, 16, 242)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                display: true,
                ticks: {
                    beginAtZero: true,
                    suggestedMax: 72,
                    stepvalue: 8
                }
            }]
        }
    }
  });


  constructor(private _prediction: PredictionService) {
  }

  ngOnInit() {
      const now = new Date();
      this._prediction.getPrediction(now.getDay())
        .subscribe(res => {
          this.chart = new Chart('canvas', {
            type: 'bar',
            data: {
                labels: ["8:00 - 9:30", "9:45 - 11:15", "11:30 - 13:00",
                 "14:00 - 15:30", "15:45 - 17:15", "17:30 - 19:00", "19:00-21:00"],
                datasets: [{
                    label: 'Belegte Plätze',
                    data: res,
                    backgroundColor: [
                      'rgb(63, 81, 181)',
                      'rgb(63, 81, 181)',
                      'rgb(63, 81, 181)',
                      'rgb(63, 81, 181)',
                      'rgb(63, 81, 181)',
                      'rgb(63, 81, 181)',
                      'rgb(63, 81, 181)',
                    ],
                    borderColor: [
                      'rgb(63, 81, 181)',
                      'rgb(63, 81, 181)',
                      'rgb(63, 81, 181)',
                      'rgb(63, 81, 181)',
                      'rgb(63, 81, 181)',
                      'rgb(63, 81, 181)',
                      'rgb(63, 81, 181)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        display: true,
                        ticks: {
                            min: 0,
                            max: 72,
                            stepSize:15
                        }
                    }]
                }
            }
          })
        })
  }

  getDayOfWeek(dow: number) {
  }

  displayPrediction(weekDayNumber: number) {
      this._prediction.getPrediction(weekDayNumber)
        .subscribe(res => {
          this.chart.data.datasets[0].data = res;
          this.chart.update();
        })
  }
}
