import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { img_url } from 'src/app/endPoint';
import { CustomerServiceService } from 'src/app/services/customer/customer-service.service';
import { UserServersService } from 'src/app/services/user/user-servers.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { DeshboardServiceService } from 'src/app/services/deshborad/deshboard/deshboard-service.service';

@Component({
  selector: 'app-manage-customer',
  templateUrl: './manage-customer.component.html',
  styleUrls: ['./manage-customer.component.css']
})
export class ManageCustomerComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private customer: CustomerServiceService,
    private User: UserServersService,
    private dashboard:DeshboardServiceService
  ) { }

  customers: any[] = []
  dashboardData: any={}

  ngOnInit(): void {
    this.getallCustomer()
  }

  getallCustomer() {
    this.customer.all({}).subscribe((result: any) => {
      if (result.success) {
        this.customers = result.data
      }
      else {
        this.toastr.error(result.message)
      }
    })
  }

  change_status(customer_id: any, status: any) {
    this.User.update_status({ _id: customer_id, status: status }).subscribe((result: any) => {
      if (result.success) {
        this.toastr.success(result.message)
        this.getallCustomer()
      }
      else {
        this.toastr.error(result.message)
      }
    })
  }

  
}
