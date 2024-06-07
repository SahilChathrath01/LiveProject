import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { base_url_admin, base_url_customer } from 'src/app/endPoint';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {
  token: any
  constructor(private http: HttpClient, private auth: AuthService) {
    this.token = auth.getToken()
  }
  add(data: any) {
    let headerobj = new HttpHeaders().set("Authorization", this.token)
    return this.http.post(base_url_customer + "order/add", data, { headers: headerobj })
  }
  all(data: any) {
    let headerobj = new HttpHeaders().set("Authorization", this.token)
    return this.http.post(base_url_customer + "order/all", data, { headers: headerobj })

  }
  single(data: any) {
    let headerobj = new HttpHeaders().set("Authorization", this.token)
    return this.http.post(base_url_customer + "order/single", data, { headers: headerobj })

  }
  update1(data: any) {
    let headerobj = new HttpHeaders().set("Authorization", this.token)
    return this.http.post(base_url_customer + "order/update", data, { headers: headerobj })

  }
  // Admin Service

  all_admin(data: any) {
    let headerobj = new HttpHeaders().set("Authorization", this.token)
    return this.http.post(base_url_admin + "order/all", data, { headers: headerobj })

  }
  single_admin(data: any) {
    let headerobj = new HttpHeaders().set("Authorization", this.token)
    return this.http.post(base_url_admin + "order/single", data, { headers: headerobj })

  }
  update_admin(data: any) {
    let headerobj = new HttpHeaders().set("Authorization", this.token)
    return this.http.post(base_url_admin + "order/update", data, { headers: headerobj })
  }

}
