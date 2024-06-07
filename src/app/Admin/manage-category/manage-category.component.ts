import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { img_url } from 'src/app/endPoint';
import { CategoryServersService } from 'src/app/services/category/category-servers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.css']
})
export class ManageCategoryComponent implements OnInit {
  categors: any[] = []
  constructor(
    private toastr: ToastrService,
    private category: CategoryServersService,
    private spinner: NgxSpinnerService,) { }
  ngOnInit(): void {
    this.allCategory()
  }
  path_img(path: any) {
    return img_url + path
  }
  allCategory() {
    this.spinner.show()
    this.category.categoryAll({}).subscribe({
      next: ((result: any) => {
        this.spinner.hide()
        if (result.success) {
          this.spinner.hide()
          this.categors = result.data
        }
        else {
          this.toastr.error(result.message)
        }
      }),
      error: ((err: any) => {
        this.spinner.hide()
        console.log("Error Occurred", err);
        this.toastr.error("Error Qccured")

      }),
      complete: (() => {
        this.spinner.hide()

      })

    })
  }

  deleteCategory(categoryId: any) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    })
      .then((result) => {
        if (result.isConfirmed) {
          this.spinner.show()
          this.category.categoryDelete({ _id: categoryId }).subscribe({
            next: (result: any) => {
              this.spinner.hide()
              if (result.success) {
                Swal.fire({
                  title: "Deleted!",
                  text: "Your file has been deleted.",
                  icon: "success"
                });

                this.allCategory()
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
}


