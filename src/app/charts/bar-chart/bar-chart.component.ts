import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { SalesDataService } from 'src/app/services/sales-data.service';

import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chart.js/auto';

import { DatePipe } from '@angular/common';
import { __values } from 'tslib';
import { Order } from 'src/app/shared/Order';
import { map } from 'rxjs';

// const SAMPLE_BARCHART_DATA: any[] = [
//   { data:[65,59,80,81,56,54,30], label: 'Q3 Sales' },
//   { data:[25,39,60,91,36,54,50], label: 'Q4 Sales' }
// ];

// const SAMPLE_BARCHART_LABELS: string[] = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7'];

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  today: Date = new Date();
  pipe = new DatePipe('en-US');
  todayWithPipe = null;

  constructor(private salesDataService: SalesDataService) { }

  orders: any;
  ordersLabels: string[] = [];
  orderData: number[] = [];

  public barChartLabels: string[] = [];
  public barChartData: any[] = [];
  public data: any[] = [];
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [];
  public barChartLegend = true;
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  }


  ngOnInit() {
    // Objeto de pedidos de 100
    this.salesDataService.getOrders(1, 100).subscribe(res => {
      console.log(res);
      const localChartData = this.getChartData(res);
      // console.log(localChartData.map((x:any) => x[0]));
      this.barChartLabels = localChartData.map((x:any) => x[0]).reverse();
      this.barChartData = [{'data': localChartData.map((x: any) => x[1]), 'label': 'Sales'}];
    })
  }


  // Get Chart Data
  getChartData(res:any = Response) {
    this.orders = res['page']['data'];
    const data = this.orders.map((order: any) => order.total);
    
    // Formatted Date
    const formattedOrders = this.orders.reduce((r: any, e: any) => {
      r.push([this.pipe.transform(e.placed), e.total]);

      return r;

    }, []);

    const p: any = [];

    // Reduce Chart Data
    const chartData = formattedOrders.reduce((r: any, e: any) => {
      const key = e[0];
      if (!p[key]) {
              p[key] = e;
              r.push(p[key]);
            } else {
              p[key][1] += e[1];
            }
            return r;
          }, []);
      
          return chartData;

        }
}

