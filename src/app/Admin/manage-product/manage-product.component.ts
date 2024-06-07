import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { img_url } from 'src/app/endPoint';
import { ProductServiceService } from 'src/app/services/Product/product-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.css']
})
export class ManageProductComponent implements OnInit {
  productes: any[] = []
  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private product: ProductServiceService,
    private ActiveRoutes: ActivatedRoute) { }


  path_img(path: any) {
    return img_url + path
  }
  ngOnInit(): void {
    this.allproduct()
  }
  allproduct() {
    this.product.all_admin({}).subscribe({
      next: ((result: any) => {
        if (result.success) {
          this.toastr.success(result.message)
          this.productes = result.data
        }
        else {
          this.toastr.error(result.message)
        }
      }),
      error: ((err: any) => {
        this.toastr.error("error occured",)
        console.log(err);
        
      }),
      complete: (() => {

      })

    })
  }

  deleteCategory(categoryId:any){
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
        this.product.delete1({_id:categoryId}).subscribe({
          next:(result:any)=>{
            this.spinner.hide()
            if(result.success){
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
          this.allproduct()
            }
            else{
              this.toastr.error(result.message, "Try Again")
            }
          },
          error:(err:any)=>{
            this.spinner.hide()
            console.log("Error Occured", err);
            this.toastr.error("Some Error Occured")
          },
          complete:()=>{
            this.spinner.hide()
          }
        })
      }
    });
      
    
    
    
    
    
      
    
    
     
  }


}
