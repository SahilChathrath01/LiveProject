import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { img_url } from 'src/app/endPoint';
import { OrderServiceService } from 'src/app/services/Order/order-service.service';
import { OrderDetailService } from 'src/app/services/Orderdetail/order-detail.service';

@Component({
  selector: 'app-manage-traking-id',
  templateUrl: './manage-traking-id.component.html',
  styleUrls: ['./manage-traking-id.component.css']
})
export class ManageTrakingIdComponent {

  orders: any[] = []
  constructor(private OrderDetail: OrderDetailService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private Order: OrderServiceService) { }

  ngOnInit(): void {
   this.allOrder()
  }
  img_src(path: any) {
    return img_url + path
  }

 
  allOrder() {
    this.Order.all_admin({}).subscribe((result: any) => {
      if (result.success) {
        this.orders = result.data
      }
      else {
        this.toastr.error(result.message)
      }
    })
  }

  changeStatus(id: any, status: any) {
    this.Order.update_admin({ _id: id, status: status }).subscribe((result: any) => {
      if (result.success) {
        this.allOrder()
      }
      else {
        this.toastr.error(result.message)
      }
    })

  }
}