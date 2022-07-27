import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SalesDataService } from 'src/app/services/sales-data.service';
import { Order } from 'src/app/shared/Order';

@Component({
  selector: 'app-section-orders',
  templateUrl: './section-orders.component.html',
  styleUrls: ['./section-orders.component.css']
})
export class SectionOrdersComponent implements OnInit {

dataSource: any = [];
displayedColumns: string[] = ['id','customer','amount','orderPlaced','orderFulfilled','status'];

  constructor(private salesDataService: SalesDataService) { }

  orders: any = [];
  total = 0;
  page = 1;
  limit = 10;
  loading = false;

  // orders: Order[] = [
  //   {id: 1, customer: 
  //     {id:1, name: 'Main St Bakery', state: 'CO', email: 'mainst@gmail.com'}, 
  //     total: 230, placed: new Date(2017,12,1), fulfilled: new Date(2017,12,3)},
      
  //   {id: 2, customer: 
  //     {id:1, name: 'Main St Bakery', state: 'CO', email: 'mainst@gmail.com'}, 
  //     total: 230, placed: new Date(2017,12,1), fulfilled: new Date(2017,12,3)},

  //   {id: 3, customer: 
  //     {id:1, name: 'Main St Bakery', state: 'CO', email: 'mainst@gmail.com'}, 
  //     total: 230, placed: new Date(2017,12,1), fulfilled: new Date(2017,12,3)},

  //   {id: 4, customer: 
  //     {id:1, name: 'Main St Bakery', state: 'CO', email: 'mainst@gmail.com'}, 
  //     total: 230, placed: new Date(2017,12,1), fulfilled: new Date(2017,12,3)},

  //   {id: 5, customer: 
  //     {id:1, name: 'Main St Bakery', state: 'CO', email: 'mainst@gmail.com'}, 
  //     total: 230, placed: new Date(2017,12,1), fulfilled: new Date(2017,12,3)},
  // ];


  ngOnInit(): void {
    this.onDataTable();
  }


  // Datos de la tabla y paginación
  onDataTable() {
    this.salesDataService.getOrders(this.page, this.limit).subscribe((data:any) => {
      console.log('result from Orders:', data);
      
      this.orders = data['page']['data'];
      this.total = data['page'].total;
      this.loading = false;
      console.log(data);
      });
  }
 

  goToPrevious(): void {
    //console.log('Previous Button clicked!');
    this.page --;
    this.onDataTable();
  }


  goToNext(): void {
    //console.log('Next Button clicked!');
    this.page ++;
    this.onDataTable();
  }


  goToPage(num: number): void {
    this.page = num;
    this.onDataTable();
  }


}
