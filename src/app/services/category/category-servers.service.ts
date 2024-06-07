import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { base_url_admin, base_url_customer } from 'src/app/endPoint';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryServersService {
  token: any
  constructor(private http: HttpClient, private auth: AuthService) {
    this.token = auth.getToken()
  }
// ....................................................................................
//                             Customer Service 
//..................................................................................... 
  categoryAll(data: any) {
    return this.http.post(base_url_customer + "category/all", data)
  }

  categorysingle_customer(data: any) {
    return this.http.post(base_url_customer + "category/single", data)
  }

  // ...................................................................................
  //                           Admin Service
  // ....................................................................................
  categoryall(data: any) {
    let headerobj = new HttpHeaders().set("Authorization", this.token)
    return this.http.post(base_url_admin + "category/all", data, { headers: headerobj })
  }
  category1(data: any) {
    let headerobj = new HttpHeaders().set("Authorization", this.token)
    return this.http.post(base_url_admin + "category/single", data, { headers: headerobj })
  }

  categoryadd(data: any) {
    let headerobj = new HttpHeaders().set("Authorization", this.token)
    return this.http.post(base_url_admin + "category/add", data, { headers: headerobj })
  }
  categoryUpdate(data: any) {
    let headerobj = new HttpHeaders().set("Authorization", this.token)
    return this.http.post(base_url_admin + "category/update", data, { headers: headerobj })
  }

  categoryDelete(data: any) {
    let headerobj = new HttpHeaders().set("Authorization", this.token)
    return this.http.post(base_url_admin + "category/delete", data, { headers: headerobj })
  }

}
