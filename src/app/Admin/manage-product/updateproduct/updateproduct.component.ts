import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ProductServiceService } from 'src/app/services/Product/product-service.service';

@Component({
  selector: 'app-updateproduct',
  templateUrl: './updateproduct.component.html',
  styleUrls: ['./updateproduct.component.css']
})
export class UpdateproductComponent implements OnInit {
  productId: any
  updateForm = new FormGroup({
    name: new FormControl(),
    description: new FormControl(),
    price: new FormControl(),
    image: new FormControl(),
    _id: new FormControl()
  })

  constructor(
    private product: ProductServiceService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private activeraoute: ActivatedRoute,
    private router : Router) { }

  // ngOnInit(): void {
  //   this.productId = this.activeraoute.snapshot.paramMap.get('id')
  //   this.getsingleproduct()
  // }
  // getsingleproduct() {
  //   let productData: any = {}
  //   this.product.single_admin({ _id: this.productId }).subscribe({
  //     next: ((result: any) => {
  //       if (result.success) {
  //         this.updateForm.patchValue({ name: productData.name, _id: productData._id, description: productData.description, price: productData.price, image: productData.image })
  //         productData = result.data
  //       }
  //       else {
  //         this.toastr.error(result.message)
  //       }
  //     }),
  //     error: ((err) => {
  //       this.spinner.hide()
  //       this.toastr.error("Error qccured", err)
  //     }),
  //     complete: (() => {
  //       this.spinner.hide()

  //     })
  //   })
  // }
  // Submit() {
  //   console.log(this.updateForm.value)
  //   let a = new FormData()
  //   a.append('name', this.updateForm.value.name)
  //   a.append('_id', this.updateForm.value._id)
  //   a.append('description',this.updateForm.value.description)
  //   a.append('price', this.updateForm.value.price)

  //   if(!!this.updateForm.value.image){
  //     a.append('picture',this.updateForm.value.image)
  //   }
  //   this.product.update1(a).subscribe((result:any)=>{
  //     if(result.success){
  //       this.toastr.success(result.message, "Success")
  //     }
  //     else{
  //       this.toastr.error(result.message)
  //     }
  //   })
  // }



  
  ngOnInit(): void {
    this.productId = this.activeraoute.snapshot.paramMap.get('id')
    this.singleCategory()
  }
  singleCategory() {
    let productData: any = {}
    this.spinner.show()
    this.product.single_admin({ _id: this.productId }).subscribe({
      next: ((result: any) => {
        this.spinner.hide()
        if (result.success) {
          productData = result.data
          this.updateForm.patchValue({ name: productData.name, _id: productData._id ,description:productData.description, price: productData.price, image:productData.image })
        }
        else {
          this.toastr.error(result.message)

        }
      }),
      error: ((err: any) => {
        this.spinner.hide()
        this.toastr.error(err, "Error occured")
      }),
      complete: (() => {
        this.spinner.hide()

      })
    })
  }
  img_change(env: any) {
    this.updateForm.patchValue({ image: env.target.files[0] })
  }

  Submit() {
    let a = new FormData()
    a.append('name', this.updateForm.value.name ?? '')
    a.append('description', this.updateForm.value.description ?? '')
    a.append('_id', this.updateForm.value._id ?? '')
    a.append("price",this.updateForm.value.price ?? '') 

    if (!!this.updateForm.value.image) {
      a.append('picture', this.updateForm.value.image ?? '')
    }
    this.product.update1(a).subscribe((result: any) => {
      if (result.success) {
        this.spinner.hide()
        this.toastr.success(result.message)
        this.router.navigateByUrl("/admin-layout/manage-product")
      }
      else {
        this.spinner.hide()
        this.toastr.error(result.message)
      }
    })

  }
}
