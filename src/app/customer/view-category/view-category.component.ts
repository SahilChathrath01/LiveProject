import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { img_url } from 'src/app/endPoint';
import { CategoryServersService } from 'src/app/services/category/category-servers.service';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css']
})
export class ViewCategoryComponent implements OnInit {
  categories: any[] = []
  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private category1: CategoryServersService) { }

  ngOnInit(): void {
    this.category_all()
  }
  getImgSrc(path: any) {
    return img_url + path
  }


  category_all() {
    this.spinner.show()
    this.category1.categoryAll({}).subscribe({
      next: ((result: any) => {
        if (result.success) {
          this.categories = result.data
        }
        else {
          this.toastr.error(result.message)
        }
      }),

      error: ((err: any) => {
        this.spinner.hide()
        this.toastr.error(err, "error ouccred")
        console.log(err, "error");
      }),

      complete: (() => {
        this.spinner.hide()
      }),

    })
  }

}
