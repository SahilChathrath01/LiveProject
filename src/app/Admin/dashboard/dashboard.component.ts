import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DeshboardServiceService } from 'src/app/services/deshborad/deshboard/deshboard-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dashboardData: any={}
  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private dashboard: DeshboardServiceService) { }

  ngOnInit(): void {
    this.getDashboard()
  }
  getDashboard() {
    this.spinner.show()
    this.dashboard.dashboard({}).subscribe({
      next: ((result: any) => {
        this.spinner.hide()
        if (result.success) {
          this.dashboardData = result
        }
        else {
          this.toastr.error(result.message)
        }
      }),
      error: ((err) => {
        this.spinner.hide()
        this.toastr.error("Error Occured", err)

      }),
      complete: (() => {
        this.spinner.hide()
      })
    })
  }
}
