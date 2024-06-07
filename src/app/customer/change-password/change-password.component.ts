import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserServersService } from 'src/app/services/user/user-servers.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  userdata: any
  changeForm = new FormGroup({
    current: new FormControl("", [Validators.required]),
    newpassword: new FormControl("", [Validators.required]),
    comfirm: new FormControl("", [Validators.required]),
    _id: new FormControl("", [Validators.required])

  })
  constructor
    (private toastr: ToastrService,
      private router: Router,
      private spinner: NgxSpinnerService,
      private User: UserServersService,
      private auth: AuthService) { }

  ngOnInit(): void {
    this.userdata = JSON.parse(sessionStorage.getItem('userdata') ?? '')
    this.changeForm.patchValue({ _id: this.userdata._id })
  }
  changesubmit() {
    if (this.changeForm.value.newpassword == this.changeForm.value.comfirm) {
      this.User.change_password(this.changeForm.value).subscribe({
        next: ((result: any) => {
          this.spinner.hide()
          if (result.success) {
            this.toastr.success(result.message)
            this.changeForm.reset()
            this.auth.setData(result)
            this.changeForm.reset()
          }
          else {
            this.toastr.error(result.message)

          }
        }),
        error: ((err) => {
          this.spinner.hide()
          this.toastr.error("ERROR QCCURED", err)

        }),
        complete: (() => {
          this.spinner.hide()

        })
      })
    }
    else {
      this.toastr.error('New password & Confirm Passwords Does not match')
    }
  }
}
