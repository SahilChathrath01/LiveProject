import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CategoryServersService } from 'src/app/services/category/category-servers.service';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {
  categoryId: any
  categoryForm = new FormGroup({
    _id: new FormControl("", [Validators.required]),
    name: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required]),
    image: new FormControl("", [Validators.required]),

  })
  constructor(
    private activeRoutes: ActivatedRoute,
    private category: CategoryServersService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.categoryId = this.activeRoutes.snapshot.paramMap.get('id')
    this.singleCategory()
  }
  singleCategory() {
    let categoryData: any = {}
    this.spinner.show()
    this.category.categoryUpdate({ _id: this.categoryId }).subscribe({
      next: ((result: any) => {
        this.spinner.hide()
        if (result.success) {
          categoryData = result.data
          this.categoryForm.patchValue({ name: categoryData.name, _id: categoryData._id ,description:categoryData.description })
        }
        else {
          this.toastr.error(result.message)

        }
      }),
      error: ((err: any) => {
        this.spinner.hide()
        this.toastr.error(err, "Error occured",err)
      }),
      complete: (() => {
        this.spinner.hide()

      })
    })
  }
  img_change(env: any) {
    this.categoryForm.patchValue({ image: env.target.files[0] })
  }

  Submit() {
    let a = new FormData()
    a.append('name', this.categoryForm.value.name ?? '')
    a.append('description', this.categoryForm.value.description ?? '')
    a.append('_id', this.categoryForm.value._id ?? '')

    if (!!this.categoryForm.value.image) {
      a.append('picture', this.categoryForm.value.image ?? '')
    }
    this.category.categoryUpdate(a).subscribe((result: any) => {
      if (result.success) {
        this.spinner.hide()
        this.toastr.success(result.message)
        this.router.navigateByUrl("/admin-layout/manage-category")
      }
      else {
        this.spinner.hide()
        this.toastr.error(result.message)
      }
    })

  }
}
