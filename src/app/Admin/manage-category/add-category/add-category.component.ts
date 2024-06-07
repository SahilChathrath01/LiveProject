import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CategoryServersService } from 'src/app/services/category/category-servers.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {
  categoryForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required]),
    image: new FormControl(null, [Validators.required]),

  })
  constructor(
    private category: CategoryServersService, 
    private toastr: ToastrService, 
    private spinner: NgxSpinnerService, 
    private router: Router) { }

  img_src(env: any) {
    this.categoryForm.patchValue({ image: env.target.files[0] })
  }
  submit() {
    console.log(this.categoryForm.value)
    this.spinner.show()
    let a = new FormData()
    a.append("name", this.categoryForm.value.name ?? '')
    a.append("picture", this.categoryForm.value.image ?? '')
    a.append("description",this.categoryForm.value.description ?? '')

    this.category.categoryadd(a).subscribe({

      next: ((result: any) => {
        this.spinner.hide()
        if (result.success) {
          this.toastr.success(result.message)
          this.router.navigateByUrl("/admin-layout/manage-category")
        }
        else {
          this.toastr.error(result.message)
        }
      }),
      error: ((err) => {
        this.spinner.hide()
        this.toastr.error("Error Qccured", err)
        console.log(err, "error qccured");

      }),
      complete: (() => {
        this.spinner.hide()
      })
    })


  }

  

}
