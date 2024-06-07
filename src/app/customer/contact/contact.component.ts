import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ContactServiceService } from 'src/app/services/contact/contact-service.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required]),
    subject: new FormControl("", [Validators.required]),
    message : new FormControl("", [Validators.required])
  })

  constructor(
    private toastr: ToastrService,
    private authservices: AuthService,
    private router: Router,
    private contact :ContactServiceService
  ) { }
  Submit() {
    console.log(this.contactForm.value)
    this.contact.add(this.contactForm.value).subscribe({
      next: ((result: any) => {
        if (result.success) {
          this.toastr.success(result.message)
          this.authservices.setData(result)
          this.router.navigateByUrl("/customer-layout/home")
        }
        else {
          this.toastr.error(result.message)

        }
      }),
      error: ((err: any) => {
        this.toastr.error("error occured", err)
      }),
      complete: (() => {

      })

    })

  }
}
