import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Toast, ToastrService } from 'ngx-toastr';
import { CustomerServiceService } from 'src/app/services/customer/customer-service.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent {

  userdata: any
  customers:any[]=[]
  SingleCustomerData:any={}
  viewForm = new FormGroup({
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
    this.viewForm.patchValue({ _id: this.userdata._id })
    this.SingleCustomer()
    this.view_Profile()
  }

  view_Profile() {
    let customerData: any = {}
    this.spinner.show()
    this.customer.single2({ _id: this.viewForm.value._id }).subscribe({
      next: ((result: any) => {
        if (result.success) {
          customerData = result.data
          this.viewForm.patchValue({ name: customerData.name, _id: this.userdata._id, email: customerData.email, gender: customerData.gender, phone: customerData.phone, address: customerData.address, })
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
    let a = new FormData()
    a.append('name', this.viewForm.value.name ?? '')
    a.append('email', this.viewForm.value.email ?? '')
    a.append('gender', this.viewForm.value.gender ?? '')
    a.append('phone', this.viewForm.value.phone ?? '')
    a.append('address', this.viewForm.value.address ?? '')
    a.append('_id', this.viewForm.value._id ?? '')

    this.customer.single2(a).subscribe({
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

  SingleCustomer(){
    this.customer.single2({_id:this.userdata._id}).subscribe({
      next:((result:any)=>{
        this.spinner.hide()
        if(result.success){
          this.SingleCustomerData = result.data
          console.log("userdata",this.SingleCustomerData);
        }
        else{
          this.toastr.error(result.message)
        }
      }),
      error:((err)=>{
        this.spinner.hide()
        this.toastr.error("Error qccured")
        console.log(err);
      }),
      complete:(()=>{
        this.spinner.hide()
      })
    })
  
  }

}
