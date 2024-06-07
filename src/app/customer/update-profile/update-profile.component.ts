import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CustomerServiceService } from 'src/app/services/customer/customer-service.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  userdata: any
  profileform = new FormGroup({
    name: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required]),
    gender: new FormControl("", [Validators.required]),
    phone: new FormControl("", [Validators.required]),
    address: new FormControl("", [Validators.required]),
    _id: new FormControl("", [Validators.required])
  })
  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private customer: CustomerServiceService,
    private router: Router) { }


  ngOnInit(): void {
    this.userdata = JSON.parse(sessionStorage.getItem('userdata') ?? '')
    this.profileform.patchValue({ _id: this.userdata._id })
    this.update_Profile()
  }

  update_Profile() {
    let customerData: any = {}
    this.spinner.show()
    this.customer.update_profile({ _id:this.profileform.value}).subscribe({
      next: ((result: any) => {
        if (result.success) {
          customerData = result.data
          this.profileform.patchValue({ name: customerData.name,_id:this.userdata._id,  email: customerData.email, gender: customerData.gender, phone: customerData.phone, address: customerData.address, })
        }
        else {
          this.toastr.error(result.message)
        }
      }),
      error: ((err: any) => {
        this.spinner.hide()
        this.toastr.error(err, "Error occured", err)
      }),
      complete: (() => {
        this.spinner.hide()

      })
    })


  }
  profilesubmit() {
      
    this.customer.update_profile(this.profileform.value).subscribe({
      next: ((result: any) => {
        this.spinner.hide()
        if (result.success) {
          this.toastr.success(result.message)
          this.router.navigateByUrl("/customer-layout/home")
        }
        else {
          this.spinner.hide()
          this.toastr.error(result.message)
        }
      }),
      error: ((err: any) => {
        this.toastr.error("error qccured", err)
      }),
      complete: (() => {
        this.spinner.hide()
      })
    })

  }
}
