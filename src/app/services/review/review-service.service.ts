import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { base_url_admin, base_url_customer } from 'src/app/endPoint';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewServiceService {
  token: any
  constructor(private http: HttpClient, private auth: AuthService) {
    this.token = auth.getToken()
  }

  review(data: any) {
    let headerobj = new HttpHeaders().set("Authorization", this.token)
    return this.http.post(base_url_customer + "review/add", data, { headers: headerobj })
  }

  reviewAll(data: any) {
    return this.http.post(base_url_customer + "reviwe/all", data)
  }

  // ....................................................................................|
  //                                Admin Service
  // ....................................................................................| 


  reviewAll1(data: any) {
    return this.http.post(base_url_admin + "review/all", data)
  }
}
