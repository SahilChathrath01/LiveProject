import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { img_url } from 'src/app/endPoint';
import { OrderServiceService } from 'src/app/services/Order/order-service.service';
import { OrderDetailService } from 'src/app/services/Orderdetail/order-detail.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-order-traking',
  templateUrl: './order-traking.component.html',
  styleUrls: ['./order-traking.component.css']
})
export class OrderTrakingComponent implements OnInit {
  orderId: any
  orders: any[] = []
  constructor(private OrderDetail: OrderDetailService,
    private toastr: ToastrService,
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
          this.orders = result.data
        }
        else {
          this.toastr.error(result.message)
        }
      }),
      error: ((err) => {
        console.log(err, "error Qccured");
        this.toastr.error("ERROR QCCURED", err)
      }),
      complete: (() => {

      })
    })
  }
}
