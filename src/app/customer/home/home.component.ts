import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { img_url } from 'src/app/endPoint';
import { ReviewServiceService } from 'src/app/services/review/review-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  reviewsData: any[] = []
  constructor(private reviewService: ReviewServiceService, private spinner: NgxSpinnerService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.All_review()
  }
  Img_scr(path: any) {
    return img_url + path
  }



  All_review() {
    this.reviewService.reviewAll({}).subscribe((result: any) => {
      if (result.success) {
        this.reviewsData = result.data
      }
      else {
        this.toastr.warning(result.message)
      }
    })
  }
}
