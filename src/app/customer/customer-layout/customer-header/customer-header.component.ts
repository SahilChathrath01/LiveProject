import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CartServiceService } from 'src/app/services/cart/cart-service.service';
import { CategoryServersService } from 'src/app/services/category/category-servers.service';

@Component({
  selector: 'app-customer-header',
  templateUrl: './customer-header.component.html',
  styleUrls: ['./customer-header.component.css']
})
export class CustomerHeaderComponent implements OnInit {
  userdata:any

  ngOnInit(): void {
    this.checklogin()
    this.category_all()
  }
  isLogin: boolean = false

  checklogin() {
    if (sessionStorage.getItem('token') != null) {
      this.isLogin = true
      this.Allcart()

    }
    else {
      this.isLogin = false
    }
  }

 
  logout() {
    this.authService.clearData()
    this.router.navigateByUrl('/login')
  }
  categories: any[] = []
  carts:any[]=[]
  constructor(
    private router: Router,
    private authService: AuthService,
    private category: CategoryServersService,
    private cart : CartServiceService,
    private toastr: ToastrService, private spinner: NgxSpinnerService) {
  }
  category_all() {
    this.spinner.show()
    this.category.categoryAll({}).subscribe({
      next: ((result: any) => {
        if (result.success) {
          // this.toastr.success(result.message)
          this.categories = result.data

        }
        else {
          this.toastr.error(result.message)
        }
      }),

      error: ((err:any) => {
        this.spinner.hide()
        this.toastr.error(err, "error ouccred")
        console.log(err, "error");
      }),

      complete: (() => {
        this.spinner.hide()
      }),

    })
  }
  total:any=0
  Allcart() {
    this.userdata = JSON.parse(sessionStorage.getItem('userdata') ?? '') 
    this.cart.all({userId:this.userdata._id}).subscribe({
      next: ((result: any) => {
        if (result.success) {
          // this.toastr.success(result.message)
          this.carts = result.data
          this.total  = result.data.length
        }
        else {
          this.toastr.error(result.message)
        }
      }),
      error: ((err:any) => {
        this.toastr.error(err, "ERROR QCCURED")
      }),
      complete: (() => {

      })
    })
  }
}

