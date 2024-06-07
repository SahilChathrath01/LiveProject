import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ReviewServiceService } from 'src/app/services/review/review-service.service';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {
  userdata: any
  reviewForm = new FormGroup({
    name: new FormControl(),
    email: new FormControl(),
    review: new FormControl(),
    rating: new FormControl(),
    // Image: new FormControl(),
    userId: new FormControl()
  })
  ngOnInit(): void {
    this.userdata = JSON.parse(sessionStorage.getItem('userdata') ?? "")
    this.reviewForm.patchValue({ userId: this.userdata._id })
  }

  constructor(private review: ReviewServiceService, private toastr: ToastrService) { }
  submit() {
    this.review.review(this.reviewForm.value).subscribe({
      next: ((result: any) => {
        if (result.success) {
          this.toastr.success(result.message)
        }
        else {
          this.toastr.error(result.message)
        }
      }),
      error: ((err) => {
        console.log(err);
      }),
      complete: (() => {

      })
    })
  }

}
