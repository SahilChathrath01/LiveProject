import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ProductServiceService } from 'src/app/services/Product/product-service.service';
import { CategoryServersService } from 'src/app/services/category/category-servers.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
// export class AddProductComponent implements OnInit {
//   categories: any[] = []
//   productImages!:FileList 
//   ProductForm = new FormGroup({
//     name: new FormControl(""),
//     description: new FormControl(""),
//     price: new FormControl(""),
//     categoryId: new FormControl("")
//   })
//   constructor(
//     private categoryService: CategoryServersService,
//     private product: ProductServiceService,
//     private toastr: ToastrService,
//     private spinner: NgxSpinnerService,
//     private router: Router,
//    ) { }

//   ngOnInit(): void {
//     this.getAllCategories()
//   }


//   img_change(evt: any) {
//     this.productImages = evt.target.files
//     // console.log(this.ProductForm.value.image);

//   }

//   getAllCategories() {
//     this.categoryService.categoryall({}).subscribe({
//       next: ((result: any) => {
//         this.spinner.hide()
//         if (result.success) {
//           this.categories = result.data
//         }
//         else {
//           this.toastr.error(result.message)
//         }
//       }),
//       error: ((err) => {
//         this.spinner.hide()
//         console.log("Error Occurred", err);
//         this.toastr.error("Error Occured")
//       }),
//       complete: (() => {
//         this.spinner.hide()
//       })
//     })
//   }


//   submit() { 
//     let a = new FormData()
//     a.append('name',this.ProductForm.value.name ?? '')
//     a.append('description',this.ProductForm.value.description ?? '')
//     a.append('price',this.ProductForm.value.price ?? '')
//     a.append('categoryId',this.ProductForm.value.categoryId?? '')

//    if(!!this.productImages){
//     a.append('picture', JSON.stringify(this.productImages))
//    }
//    console.log("Final data", a);

//    this.product.add(a).subscribe({
//     next:((result:any)=>{
//       if(result.success){
//         this.toastr.success(result.message)
//         this.router.navigateByUrl("/admin-layout/manage-product")
//       }
//       else{
//         this.toastr.error(result.message)
//       }
//     })
//    })
//   }

// }

export class AddProductComponent implements OnInit {
  categories: any[] = []
  ProductForm = new FormGroup({
    name: new FormControl(""),
    image: new FormControl(),
    description: new FormControl(""),
    price: new FormControl(""),
    categoryId: new FormControl("")
  })
  constructor(
    private categoryService: CategoryServersService,
    private product: ProductServiceService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.GetallCategory()
  }
  img_change(evt: any) {
    console.log(evt);
    this.ProductForm.patchValue({ image: evt.target.files[0]})
  }

  GetallCategory() {
    this.spinner.show()
    this.categoryService.categoryall({}).subscribe({
      next: ((result: any) => {
        this.spinner.hide()
        if (result.success) {
          this.categories = result.data
          console.log(this.categories);
        }
        else {
          this.toastr.error(result.message)
        }
      }),
      error: ((err) => {
        this.spinner.hide()
        console.log("Error Occurred", err);
        this.toastr.error("Error qccured")
      }),
      complete: (() => {
        this.spinner.hide()
      })
    })
  }

  submit() {
    let a = new FormData()
    a.append('name', this.ProductForm.value.name ?? '')
    a.append('description', this.ProductForm.value.description ?? '')
    a.append('price', this.ProductForm.value.price ?? '')
    a.append('categoryId', this.ProductForm.value.categoryId ?? '')

    if (!!this.ProductForm.value.image) {
      a.append('picture', this.ProductForm.value.image ?? '')
    }
    this.product.add(a).subscribe({
      next: ((result: any) => {
        this.spinner.hide()
        if (result.success) {
          this.toastr.success(result.message)
          this.router.navigateByUrl("/admin-layout/manage-product")
        }
        else{
          this.toastr.error(result.message)
        }
      }),
      error:((err)=>{
        this.spinner.hide()
        this.toastr.error("Error Qccured")
        console.log(err);
      }),
      complete:(()=>{
        this.spinner.hide()
      })
    })

  }

}