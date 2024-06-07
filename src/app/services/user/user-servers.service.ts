import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { base_url_admin, base_url_customer } from 'src/app/endPoint';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserServersService {
  token: any
  userdata:any
  constructor(private https: HttpClient, private auth: AuthService) {
    this.token = auth.getToken()
  }

  login(data: any) {
    return this.https.post(base_url_admin + "login", data)
  }
 
  change_password(data: any) {
    let headerobj = new HttpHeaders().set("Authorization",this.token)
    return this.https.post(base_url_admin + "change/password",data,{headers:headerobj})
  }


  update_status(data: any) {
    let headerobj = new HttpHeaders().set("Authorization", this.token)
    return this.https.post(base_url_admin + "update/status",data,{headers:headerobj})

  }

  // .....................................................................................|
  //                              Customer Service
  // .....................................................................................|

  change_password2(data: any) {
    let headerobj = new HttpHeaders().set("Authorization", this.token)
    return this.https.post(base_url_customer + "change/password",data,{headers:headerobj})
  }
  

}
