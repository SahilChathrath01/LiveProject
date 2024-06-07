import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContactServiceService } from 'src/app/services/contact/contact-service.service';
import { UserServersService } from 'src/app/services/user/user-servers.service';

@Component({
  selector: 'app-manage-contact',
  templateUrl: './manage-contact.component.html',
  styleUrls: ['./manage-contact.component.css']
})
export class ManageContactComponent implements OnInit {
  contactes: any[] = []
  constructor(private toastr: ToastrService, private Contact: ContactServiceService, private router: Router, private contact:ContactServiceService, private ngxSpinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.AllContact()
  }

  AllContact() {
    this.ngxSpinner.show()
    this.Contact.contactAll_Admin({}).subscribe({
      next: ((result: any) => {
        this.ngxSpinner.hide()
        if (result.success) {
          this.contactes = result.data
        }
        else {
          this.toastr.error(result.message)
        }
      }),
      error: ((err) => {
        this.ngxSpinner.hide()
        console.log(err, "error occured");
        this.toastr.error("Error occured", err)
      }),
      complete: (() => {
        this.ngxSpinner.hide()
      })
    })
  }

  change_status(customer_id: any, status: any) {
  this.contact.update({ _id:customer_id , status : status}).subscribe((result: any) => {
      if (result.success) {
        this.toastr.success(result.message)
        this.AllContact()
      }
      else {
        console.log(result);
        this.toastr.error(result.message)
      }
    })
  }
}

