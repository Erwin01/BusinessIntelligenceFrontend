import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SalesDataService {


  baseUrlOrders: string = 'https://localhost:44366/api/order/';
  baseUrlOrderByCustomer: string = 'https://localhost:44366/api/order/bycustomer/';
  baseUrlOrderByState: string = 'https://localhost:44366/api/order/bystate/';

  constructor(private http: HttpClient) { }


  /*Get Orders | Pagination*/
  getOrders(pageIndex: number, pageSize: number) {
      return this.http.get(this.baseUrlOrders + pageIndex + '/' + pageSize);
  }


  /*Get Orders By Customer*/
  getOrdersByCustomer(numberId: number) {
    return this.http.get(this.baseUrlOrderByCustomer + numberId);
  }


  /*Get Orders By State*/
  getOrdersByState() {
    return this.http.get(this.baseUrlOrderByState);
  }

   
}
