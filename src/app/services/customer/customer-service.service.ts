import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { base_url_admin, base_url_customer } from 'src/app/endPoint';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {
  token: any
  constructor(private http: HttpClient, private auth: AuthService) {
    this.token = auth.getToken()
  }

  register(data: any) {
    return this.http.post(base_url_customer + "register", data)
  }

  all2(data: any) {
    return this.http.post(base_url_customer + "all", data)
  }

  single2(data: any) {
    return this.http.post(base_url_customer + "single", data)

  }

  update_profile(data: any) {
    let headerobj = new HttpHeaders().set("Authorization", this.token)
    return this.http.post(base_url_customer + "update/profile", data, { headers: headerobj })
  }
  // ........................................................................................|
  //                                      Admin Service 
  // .........................................................................................}

  all(data: any) {
    let headerobj = new HttpHeaders().set("Authorization", this.token)
    return this.http.post(base_url_admin + "all", data,{headers:headerobj})
  }

  single(data: any) {
    return this.http.post(base_url_admin + "single", data)
  }
}
