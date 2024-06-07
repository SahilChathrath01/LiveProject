import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { OrderServiceService } from 'src/app/services/Order/order-service.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {
  userdata: any
  Orders: any[] = []
  constructor(private Order: OrderServiceService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router) { }

  ngOnInit(): void {
    this.userdata = JSON.parse(sessionStorage.getItem('userdata') ?? '')
    console.log("userId", this.userdata._id);
    this.All_order(this.userdata._id)
  }

  All_order(id: any) {
    this.Order.all({ userId: id }).subscribe((result: any) => {
      if (result.success) {
        this.Orders = result.data
      }
      else {
        this.toastr.error(result.message)
      }
    })
  }

  changeStatus(id: any, status: any) {
    this.Order.update1({ _id: id, status: status }).subscribe({
      next: ((result: any) => {
        if (result.success) {
          this.All_order(this.userdata._id)
        }
        else {
          this.toastr.error(result.message)
        }
      }),
      error: ((err) => {
        console.log(err);
        this.toastr.error("error occured")
      }),
      complete: (() => {

      })
    })
  }


  Add_review() {
   setTimeout(() => {
    this.router.navigateByUrl("/customer-layout/add-review")
   },3000);
  }



}
