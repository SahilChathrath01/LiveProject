import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { base_url_admin, base_url_customer } from 'src/app/endPoint';

@Injectable({
  providedIn: 'root'
})
export class ContactServiceService {
  token: any
  constructor(private http: HttpClient, private auth: AuthService) {
    this.token = auth.getToken()
  }
  //......................................................................................| 
  //                          Admin Service
  // .......................................................................................|
  contactAll_Admin(data: any) {
    let headerobj = new HttpHeaders().set("Authorization", this.token)
    return this.http.post(base_url_admin + "contact/all", data, { headers: headerobj })
  }


  // ........................................................................................|
  //                            Customer Service
  // ........................................................................................|


  contact2(data: any) {
    return this.http.post(base_url_customer + "contact/all", data)
  }

  update(data: any) {
    let headerobj = new HttpHeaders().set("Authorization", this.token)
    return this.http.post(base_url_customer + "contact/update", data, {headers:headerobj})

  }

  add(data: any) {
    return this.http.post(base_url_customer + "contact/add", data)
  }
}
