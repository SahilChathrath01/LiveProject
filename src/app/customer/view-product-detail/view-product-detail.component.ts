import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { img_url } from 'src/app/endPoint';
import { ProductServiceService } from 'src/app/services/Product/product-service.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CartServiceService } from 'src/app/services/cart/cart-service.service';
import { CategoryServersService } from 'src/app/services/category/category-servers.service';

@Component({
  selector: 'app-view-product-detail',
  templateUrl: './view-product-detail.component.html',
  styleUrls: ['./view-product-detail.component.css']
})
export class ViewProductDetailComponent implements OnInit {
  productId: any
  userdata: any
  categoryData: any[] = []
  productData: any = {}
  constructor(
    private authService: AuthService,
    private router: Router,
    private toster: ToastrService,
    private spinner: NgxSpinnerService,
    private activeRoutes: ActivatedRoute,
    private product: ProductServiceService,
    private cart: CartServiceService,
    private Category: CategoryServersService
  ) { }

  cartForm = new FormGroup({
    userId: new FormControl("", [Validators.required]),
    productId: new FormControl("", [Validators.required]),
    quantity: new FormControl("", [Validators.required]),
  })


  ngOnInit(): void {

    this.productId = this.activeRoutes.snapshot.paramMap.get('id')
    this.Singleproducts_detail()
    this.cartForm.patchValue({ productId: this.productId })

  }

  getImg(path:any){
    return img_url + path
  }

  Singleproducts_detail() {
    this.product.single_customer({ _id: this.productId }).subscribe({
      next: ((result: any) => {
        this.spinner.hide()
        if (result.success) {
          this.productData = result.data
          console.log(this.productData);
          
        }
        else {
          this.toster.error(result.message)
        }
      }),
      error: ((err) => {
        this.spinner.hide()
        this.toster.error("Error Qccured", err)
      }),
      complete: (() => {
        this.spinner.hide()
      })
    })

  }


  submit() {
    if (this.authService.getToken() != null) {
    this.userdata = JSON.parse(sessionStorage.getItem('userdata') ?? '')
    
    this.cartForm.patchValue({ userId: this.userdata._id })
      this.cart.add(this.cartForm.value).subscribe({
        next: ((result: any) => {
          if (result.success) {
            this.toster.success(result.message)
            window.location.reload()
          }
          else {
            this.toster.error(result.message)

          }
        }),
        error: ((err) => {
          this.toster.error(err, "Error Qccured")

        }),
        complete: (() => {

        })
      })

    } else {
      setTimeout(() => {
        this.router.navigateByUrl('/login')
      }, 3000)
      this.toster.error("Login Now")
    }


  }

}
