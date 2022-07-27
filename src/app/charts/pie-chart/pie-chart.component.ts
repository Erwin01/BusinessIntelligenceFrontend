import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import * as _ from 'lodash';
import { values } from 'lodash';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  
  
  constructor() { }


  @Input() 
  inputData: any;
  
  @Input()
  limit: any;
  

  // Pie
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      }
    }
  }
  
  
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [ 'ABCBakery', 'OhreadyHotels', 'MagicHotels', 'DFFG', 'AAA' ],
    datasets: [ {
      data: [ 350, 450, 120, 45, 13 ]
    } ]
  };
  

  // public pieChartType: ChartType = 'pie'; //pie,
  // public pieChartLabels: any;
  // public pieChartPlugins = [ ];

  // public pieChartData: [] = [];
  public pieChartLabels: any[] = []
  public pieChartType: ChartType = 'doughnut';
  public pieChartLegend = true;

  // public pieChartOptions = {
  //   responsive: true
  // }

  public pieChartPlugins = [];


  ngOnInit() {
    this.parseChartData(this.inputData, this.limit);    
  }


  parseChartData(res: any, limit: number) {
    // console.log(res);
    const allData = res.slice(0, limit);
    console.log(allData);
    // this.pieChartData = allData.map((x:any) => _.values(x)[1]);
    // this.pieChartLabels = allData.map((x:any) => _.values(x)[0]);

    // this.pieChartData = allData.map((pieChartData:any) => _.values(pieChartData)[1]);
    // this.pieChartLabels = allData.map((pieChartLabels:any) => _.values(pieChartLabels)[0]);
  }

}
