import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { base_url_customer } from 'src/app/endPoint';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
  token: any
  constructor(private http: HttpClient, private auth: AuthService) {
    this.token = auth.getToken()
  }

  add(data: any) {
    let headerobj = new HttpHeaders().set("Authorization", this.token)
    return this.http.post(base_url_customer + "cart/add", data, { headers: headerobj })
  }
  all(data: any) {
    let headerobj = new HttpHeaders().set("Authorization", this.token)
    return this.http.post(base_url_customer + "cart/all", data, { headers: headerobj })

  }
  update(data: any) {
    let headerobj = new HttpHeaders().set("Authorization", this.token)
    return this.http.post(base_url_customer + "cart/update", data, { headers: headerobj })

  }
  delete1(data: any) {
    let headerobj = new HttpHeaders().set("Authorization", this.token)
    return this.http.post(base_url_customer + "cart/delete", data, { headers: headerobj })

  }


}
