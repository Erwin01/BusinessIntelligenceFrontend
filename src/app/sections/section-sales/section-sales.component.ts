import { Component, OnInit } from '@angular/core';
import { SalesDataService } from 'src/app/services/sales-data.service';

@Component({
  selector: 'app-section-sales',
  templateUrl: './section-sales.component.html',
  styleUrls: ['./section-sales.component.css']
})
export class SectionSalesComponent implements OnInit {


  public salesDataByState: any;
  public salesDataByCustomer: any;


  constructor(private salesDataService: SalesDataService) { }


  ngOnInit() {

    this.salesDataService.getOrdersByState().subscribe(orderState => {
      this.salesDataByState = orderState;
    });

    
    this.salesDataService.getOrdersByCustomer(5).subscribe(orderCustomer => {
      this.salesDataByCustomer = orderCustomer;
    });

  }

}
