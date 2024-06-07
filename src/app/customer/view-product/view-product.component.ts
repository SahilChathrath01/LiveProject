import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { img_url } from 'src/app/endPoint';
import { ProductServiceService } from 'src/app/services/Product/product-service.service';
import { CategoryServersService } from 'src/app/services/category/category-servers.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  products: any[] = []
  categories: any[] = []
  categoryId:any
  constructor(
    private activatedRoute:ActivatedRoute,
    private product: ProductServiceService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private category: CategoryServersService,
  ) { }

  ngOnInit(): void {
    this.categoryId = this.activatedRoute.snapshot.paramMap.get('id')
    this.getAllproducts()
  }
  Img_src(path: any) {
    return img_url + path
  }

  getAllproducts() {
    this.product.all_customer({categoryId:this.categoryId}).subscribe({
      next: ((result: any) => {
        this.spinner.hide()

        if (result.success) {
          this.products = result.data
        }
        else {
          this.toastr.error(result.message)
        }
      }),
      error: ((err) => {
        this.spinner.hide()
        this.toastr.error(err, "error")
      }),
      complete: (() => {
        this.spinner.hide()

      })
    })
  }



  setData(evt:any){
    console.log(evt.target.value);
    
  }
}
