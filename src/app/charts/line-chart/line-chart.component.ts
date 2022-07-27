import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartDataset, ChartOptions, ChartType, Color } from 'chart.js';
import { result } from 'lodash';
import { NgChartsConfiguration } from 'ng2-charts';
import { SalesDataService } from 'src/app/services/sales-data.service';


@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {


  today: Date = new Date();
  pipe = new DatePipe('en-US');
  todayWithPipe = null;
  
  constructor(private salesDataService: SalesDataService) { }
  
  //Nuevo chartLine
  public lineChartData: any = [
    // { data: [65, 59, 80, 85, 56, 55, 29], label: 'Series A', fill: 'origin' },
    // { data: [45, 59, 10, 25, 66, 15, 89], label: 'Series B', fill: 'origin' },
    // { data: [5, 29, 0, 35, 56, 35, 99], label: 'Series C', fill: 'origin' }
    
          // {
          //   data: [ 5165, 59, 80, 81, 56, 55, 40 ],
          //   label: 'Sentiment Analysis',
          //   backgroundColor: 'rgba(6, 214, 160, 0.2)',
          //   borderColor: 'rgba(0, 200, 140, 0.5)',
          //   pointBackgroundColor: '#000',
          //   pointBorderColor: '#000',
          //   pointHoverBackgroundColor: '#555',
          //   pointHoverBorderColor: '#555',
          //   fill: 'origin',
          // },
          // {
          //   data: [ 2228, 48, 40, 19, 86, 27, 90 ],
          //   label: 'Image Recognition',
          //   backgroundColor: 'rgba(255, 209, 102, 0.2)',
          //   borderColor: 'rgba(240, 180, 89, 0.5)',
          //   pointBackgroundColor: '#000',
          //   pointBorderColor: '#000',
          //   pointHoverBackgroundColor: '#555',
          //   pointHoverBorderColor: '#555',
          //   fill: 'origin',
          // },
          // {
          //   data: [ 1180, 480, 770, 90, 1000, 270, 400 ],
          //   label: 'Forecasting',
          //   // yAxisID: 'y-axis-1',
          //   backgroundColor: 'rgba(15, 78, 133, 0.2)',
          //   borderColor: 'rgba(3, 64, 128, 0.5)',
          //   pointBackgroundColor: '#000',
          //   pointBorderColor: '#000',
          //   pointHoverBackgroundColor: '#555',
          //   pointHoverBorderColor: '#555',
          //   fill: 'origin',
          // }
        
        // labels: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July' ]
  ];

  // public lineChartLabels = ['January', 'February', 'march', 'april', 'may', 'June', 'July'];
  public lineChartLabels: any[] = [];


  public lineChartOptions: ChartOptions = {
    responsive: true,
  };

 public lineChartLegend = true;

 public lineChartType: ChartType = 'line';

 public lineChartPlugins = [];




  //Finaliza chartLine




  topCustomers: string[] = [];
  allOrders: any[] = [];
  // lineChartLabels: any;
  // lineChartData: any;

  /* Sin data 
  lineChartData: any;
  lineChartLabels: any;
  lineChartOptions: any = {
    responseive: true
  }

  lineChartLegend: true;
  lineChartType: 'line';

  */

  // public lineChartData: ChartConfiguration['data'] = {
  //   datasets: [
  //     {
  //       data: [ 65, 59, 80, 81, 56, 55, 40 ],
  //       label: 'Sentiment Analysis',
  //       backgroundColor: 'rgba(6, 214, 160, 0.2)',
  //       borderColor: 'rgba(0, 200, 140, 0.5)',
  //       pointBackgroundColor: '#000',
  //       pointBorderColor: '#000',
  //       pointHoverBackgroundColor: '#555',
  //       pointHoverBorderColor: '#555',
  //       fill: 'origin',
  //     },
  //     {
  //       data: [ 28, 48, 40, 19, 86, 27, 90 ],
  //       label: 'Image Recognition',
  //       backgroundColor: 'rgba(255, 209, 102, 0.2)',
  //       borderColor: 'rgba(240, 180, 89, 0.5)',
  //       pointBackgroundColor: '#000',
  //       pointBorderColor: '#000',
  //       pointHoverBackgroundColor: '#555',
  //       pointHoverBorderColor: '#555',
  //       fill: 'origin',
  //     },
  //     {
  //       data: [ 180, 480, 770, 90, 1000, 270, 400 ],
  //       label: 'Forecasting',
  //       yAxisID: 'y-axis-1',
  //       backgroundColor: 'rgba(15, 78, 133, 0.2)',
  //       borderColor: 'rgba(3, 64, 128, 0.5)',
  //       pointBackgroundColor: '#000',
  //       pointBorderColor: '#000',
  //       pointHoverBackgroundColor: '#555',
  //       pointHoverBorderColor: '#555',
  //       fill: 'origin',
  //     }
  //   ],
  //   labels: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July' ]
  // };


  // public lineChartOptions: ChartConfiguration['options'] = {
  //   elements: {
  //     line: {
  //       tension: 0.5
  //     }
  //   },
  //   scales: {
  //     // We use this empty structure as a placeholder for dynamic theming.
  //     x: {},
  //     'y-axis-0':
  //       {
  //         position: 'left',
  //       },
  //     'y-axis-1': {
  //       position: 'right',
  //       grid: {
  //         color: '#000',
  //       },
  //       ticks: {
  //         color: '#ededed'
  //       }
  //     }
  //   }
  // };

  // public lineChartType: ChartType = 'line';

  // lineChartLegend = true;



  ngOnInit() {
    this.salesDataService.getOrders(1, 100).subscribe((data:any) => {
      this.allOrders = data['page']['data'];

      this.salesDataService.getOrdersByCustomer(3).subscribe((cus:any) => {
        this.topCustomers = cus.map((x:any) => x['name']);

        const allChartData = this.topCustomers.reduce((result:any, i) => {
          result.push(this.getChartData(this.allOrders, i));
          return result;
        }, []);

        let dates = allChartData.map((x:any) => x['data']).reduce((a:any, i:any) => {
          a.push(i.map((date:any) => new Date(date[0])));

          return a;
        }, []);

        dates = [].concat.apply([], dates);

        const r = this.getCustomersOrdersByDate(allChartData, dates)['data'];
        console.log('r:', r);
      
        this.lineChartLabels = r[0].orders.map((order:any) => order['date']);


        this.lineChartData = [
        { 'data': r[0].orders.map((x:any) => x.total), label: 'ABCBakery' },
        { 'data': r[1].orders.map((x:any) => x.total), label: 'OhreadyHotels' },
        { 'data': r[2].orders.map((x:any) => x.total), label: 'MagicHotels' },
        ];
      });
    });   
  }



  getChartData(allOrders: any, name: string) {
    const customerOrders = allOrders.filter((o:any) => o.customer.name === name);
    //console.log('cusotmerOrders:', customerOrders);
    
    const formattedOrders = customerOrders.reduce((r:any, e:any) => {
      r.push([e.placed, e.total]);
      return r;
    }, []);
    
  //   // console.log('formattedOrders:', formattedOrders);
    const result = { customer: name, data: formattedOrders };
  //   // console.log('resilt: ', result);
    return result;
    
  }

  
  
  toFriendlyDate(date: Date) {
    return this.pipe.transform(date);
  }



  getCustomersOrdersByDate(orders:any, dates:any) {
    // for each customer => form each date =>
    // {data: [{'customer:' 'XYZ', 'orders:' [{'date:' '17-11-26', total: 2421}, {}]}, {}, {}]}
    const customers: any = this.topCustomers;
    const prettyDates = dates.map((x:any) => this.toFriendlyDate(x));
    const u = Array.from(new Set(prettyDates)).sort();
    //console.log(u);

    // define our result object to return
    const result:any  = {} = {};
    const dataSets:any = result['data'] = [];
    // console.log('result:', result);
    
    customers.reduce((x: any, y: string, i: string | number) => {
      //console.log('Reducing:', y, 'at indxex:', i);
      const customerOrders: any = [];
      dataSets[i] = {
        customer: y, orders:
        u.reduce((r:any, e:any, j:any) => {
          const obj: any = {};
          obj['date'] = e;
          obj['total'] = this.getCustomerDateTotal(e, y); //sum total orders for this customer on this date
          customerOrders.push(obj);

            //console.log('Reducing:', e, 'at index:', j, 'customerOrders:', customerOrders);
            return customerOrders;
            
        })
      }
            
      return x;
    }, []);

    return result;
  }



  getCustomerDateTotal(date: any, customer: string) {    
    const r = this.allOrders.filter(o => o.customer.name === customer 
      && this.toFriendlyDate(o.placed) === date);

      const result = r.reduce((a, b) => {
        return a + b.total
      }, 0);

  return result

  }
}
