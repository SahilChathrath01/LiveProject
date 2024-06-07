import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { base_url_admin, base_url_customer } from 'src/app/endPoint';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {
  token: any
  constructor(private http: HttpClient, private auth: AuthService) {
    this.token = auth.getToken()
  }
  Orderall(data: any) {
    let headerobj = new HttpHeaders().set("Authorization", this.token)
  return  this.http.post(base_url_customer + "order/detail", data, { headers: headerobj })
  }
  
  Orderall_admin(data: any) {
    let headerobj = new HttpHeaders().set("Authorization", this.token)
  return  this.http.post(base_url_admin + "order/detail", data, { headers: headerobj })
  }
}
