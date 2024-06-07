import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CustomerServiceService } from 'src/app/services/customer/customer-service.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private Customer: CustomerServiceService,
    private authServer: AuthService
  ) { }

  registerform = new FormGroup({
    name: new FormControl('', [Validators.required]),

    email: new FormControl('', [Validators.required, Validators.email]),

    password: new FormControl('', [Validators.required]),

    gender: new FormControl("", [Validators.required]),

    phone: new FormControl('', [Validators.required, Validators.maxLength(10)]),

    address: new FormControl('', [Validators.required]),
  })

  registerSubmit() {
  this.Customer.register(this.registerform.value).subscribe({
      next: ((result:any) => {
      if(result.success){
       this.toastr.success(result.message)
       this.router.navigateByUrl("customer-layout/home")
       this.authServer.setData(result)
      }else{
        this.toastr.error("ERROR  ouccred",result.message)
      }
      }),
      error: ((err:any) => {
        this.toastr.error("error in api",err)
      }),
      complete: (() => {
      
      })

    })
   console.log(this.registerform.value);
   
  }


}
