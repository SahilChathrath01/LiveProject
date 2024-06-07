import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { img_url } from 'src/app/endPoint';
import { OrderServiceService } from 'src/app/services/Order/order-service.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CartServiceService } from 'src/app/services/cart/cart-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-card',
  templateUrl: './view-card.component.html',
  styleUrls: ['./view-card.component.css']
})
export class ViewCardComponent implements OnInit {


  userdata: any
  carts: any[] = []
  orders: any[] = []
  constructor(
    private toastr: ToastrService,
    private Cart: CartServiceService,
    private spinner: NgxSpinnerService,
    private order: OrderServiceService,
    private activroutes: ActivatedRoute,
    private authservice: AuthService,
    private router: Router) { }

  orderForm = new FormGroup({
    userId: new FormControl("", [Validators.required]),
    productArray: new FormControl(),
    name: new FormControl("", [Validators.required]),
    address: new FormControl("", [Validators.required]),
    contact: new FormControl("", [Validators.required, Validators.max(10)])
  })


  ngOnInit(): void {
    this.userdata = JSON.parse(sessionStorage.getItem('userdata') ?? '')
    this.orderForm.patchValue({ userId: this.userdata._id })
    // console.log("userId", this.userdata._id);

    this.Allcart(this.userdata._id)
  }

  img_src(path: any) {
    return img_url + path
  }
  amount: any = 0
  // tax:any = 0
  // delivery:any = 0
  total :any = 0
  Allcart(id: any) {
    this.Cart.all({ userId: id }).subscribe({
      next: ((result: any) => {
        if (result.success) {
          this.carts = result.data
          // this.total = result.data.length
          this.calculateTotal()
        }
        else {
          this.toastr.error(result.message)
        }
      }),
      error: ((err) => {
        this.toastr.error(err, "ERROR QCCURED")
      }),
      complete: (() => {

      })
    })
  }

  calculateTotal(){
    this. amount = 0
    // this.tax = 0
    // this.delivery = 50
    // this.total = 0
    for(let x of this.carts){
      this.amount += x.productId.price*x.quantity
      // this.tax += x.productId.price*0.5/10
      // this.total += x.productId.price*0.5/10+this.delivery+this.amount
    }
  }

  plus(x_Id: any, quantity: any) {
    this.Cart.update({ _id: x_Id, quantity: Number(quantity) + 1 }).subscribe({
      next: ((result: any) => {
        if (result.success) {
          this.toastr.success(result.message)
          this.Allcart(this.userdata._id)
        }
        else {
          this.toastr.error(result.message)
        }
      }),
      error: ((err) => {
        this.toastr.error(err, "Error qcccured")
      }),
      complete: (() => {

      })
    })

  }

  minus(x_Id: any, quantity: any) {
    this.Cart.update({ _id: x_Id, quantity: Number(quantity) - 1 }).subscribe({
      next: ((result: any) => {
        if (result.success) {
          this.toastr.success(result.message)
          this.Allcart(this.userdata._id)
        }
        else {
          this.toastr.error(result.message)
        }
      }),
      error: ((err) => {
        this.toastr.error(err, "Error qcccured")
      }),
      complete: (() => {

      })
    })

  }

  deleteCart(cartId: any) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show()
        this.Cart.delete1({ _id: cartId }).subscribe({
          next: (result: any) => {
            this.spinner.hide()
            if (result.success) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
                  window.location.reload() 
              // this.Allcart(this.userdata._id)
            }
            else {
              this.toastr.error(result.message, "Try Again")
            }
          },
          error: (err: any) => {
            this.spinner.hide()
            console.log("Error Occured", err);
            this.toastr.error("Some Error Occured")
          },
          complete: () => {
            this.spinner.hide()
          }
        })
      }
    });

  }


  AddOrder() {
    let products = []
    for (let x of this.carts) {
      let obj = {
        productId: x?.productId?._id,
        price: x?.productId?.price,
        quantity: x?.quantity
      }
      products.push(obj)
    }

    this.orderForm.patchValue({ productArray: products })
    this.spinner.show()
    this.order.add(this.orderForm.value).subscribe({
      next: ((result: any) => {
        this.spinner.hide()
        if (result.success) {
          this.toastr.success(result.message)
          this.router.navigateByUrl("/customer-layout/my-order")
    
        }
        else {
          this.toastr.error(result.message)
        }
      }),
      error: ((err) => {
        this.toastr.error("")
        console.log(err);
      }),
      complete: (() => {
        this.spinner.hide()
      })
    })

  }





}

