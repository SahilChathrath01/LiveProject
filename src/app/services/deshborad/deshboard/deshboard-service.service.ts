import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { base_url_admin } from 'src/app/endPoint';

@Injectable({
  providedIn: 'root'
})
export class DeshboardServiceService {
  token: any
  constructor(private http: HttpClient, private auth: AuthService) {
    this.token = auth.getToken()
  }

  dashboard(data: any) {
    let headerobj = new HttpHeaders().set("Authorization", this.token)
   return this.http.post(base_url_admin + "dashboard", data, { headers: headerobj })
  }
}
