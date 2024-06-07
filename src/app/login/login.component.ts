import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth/auth.service';
import { UserServersService } from '../services/user/user-servers.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService,
    private User: UserServersService) { }

  loginForms = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required,])

  })
  loginSubmit() {
    this.User.login(this.loginForms.value).subscribe({
      next: ((result: any) => {
        if (result.success) {
          this.toastr.success(result.message)
          this.authService.setData(result)

          if (result.data.userType == 1)
            this.router.navigateByUrl("/admin-layout/dashboard")

          else
            this.router.navigateByUrl("/customer-layout/home")
        } else {
          this.toastr.error(result.message)
        }

      }),
      error: ((err:any) => {
       console.log(err,"error in api");
       
      }),

      complete: (() => {
       
      })

    })
  }
}
