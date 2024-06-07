import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { img_url } from 'src/app/endPoint';
import { OrderDetailService } from 'src/app/services/Orderdetail/order-detail.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-view-order-item',
  templateUrl: './view-order-item.component.html',
  styleUrls: ['./view-order-item.component.css']
})
export class ViewOrderItemComponent implements OnInit {
  orderId: any
  Orders: any[] = []
  constructor(private OrderDetail: OrderDetailService,
    private toastr: ToastrService, private spinner: NgxSpinnerService,
    private authService: AuthService, private activatedRoute: ActivatedRoute) { }
    
  ngOnInit(): void {
    this.orderId = this.activatedRoute.snapshot.paramMap.get('id')
    this.all_OrderItems(this.orderId)

  }
  img_src(path: any) {
    return img_url + path
  }

  all_OrderItems(id: any) {
    this.OrderDetail.Orderall_admin({ orderId: id }).subscribe({
      next: ((result: any) => {
        if (result.success) {
          this.toastr.success(result.message)
          this.Orders = result.data
        }
        else {
          this.toastr.error(result.message)
        }
      }),
      error: ((err) => {
        this.spinner.hide()
        console.log(err, "error Qccured");
        this.toastr.error("ERROR QCCURED", err)
      }),
      complete: (() => {
        this.spinner.hide()

      })
    })
  }
}
