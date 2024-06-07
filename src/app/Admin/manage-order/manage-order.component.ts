import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { OrderServiceService } from 'src/app/services/Order/order-service.service';

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.css']
})
export class ManageOrderComponent implements OnInit {
  Orders: any[] = []
  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private order: OrderServiceService) { }

  ngOnInit(): void {
    this.allOrder()
  }
  allOrder() {
    this.order.all_admin({}).subscribe((result: any) => {
      if (result.success) {
        this.Orders = result.data
      }
      else {
        this.toastr.error(result.message)
      }
    })
  }


  changeStatus(id:any, status:any){
    this.order.update_admin({_id:id, status:status}).subscribe({
     next:((result:any)=>{
       if(result.success){
         this.allOrder()
       }
       else{
           this.toastr.error(result.message)
       }
     }),
     error:((err)=>{
       console.log(err);
       this.toastr.error("error occured")
     }),
     complete:(()=>{
 
     })
    })
   }

}
