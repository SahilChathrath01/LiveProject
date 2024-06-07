import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { base_url_admin, base_url_customer } from 'src/app/endPoint';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
 token:any
  constructor(private http : HttpClient,private auth:AuthService) {
    this.token = auth.getToken()
   }
 

   add(data:any){
    let headerobj = new HttpHeaders().set("Authorization",this.token)
    return this.http.post(base_url_admin + "product/add",data,{headers:headerobj})

   }
   all_admin(data:any){
    let headerobj = new HttpHeaders().set("Authorization",this.token)
    return this.http.post(base_url_admin + "product/all",data,{headers:headerobj})

   }
   single_admin(data:any){
    let headerobj = new HttpHeaders().set("Authorization",this.token)
    return this.http.post(base_url_admin + "product/single",data,{headers:headerobj})

   }
 
    update1(data:any){
      let headerobj = new HttpHeaders().set("Authorization",this.token)
      return this.http.post(base_url_admin + "product/update",data,{headers:headerobj})

   }
   delete1(data:any){
    let headerobj = new HttpHeaders().set("Authorization",this.token)
    return this.http.post(base_url_admin + "product/delete",data,{headers:headerobj})

   }
// ........................................................................................|
  //                                  Customer  Service
// ........................................................................................|
   all_customer(data:any){
    return this.http.post(base_url_customer + "product/all",data)

   }
   single_customer(data:any){
    return this.http.post(base_url_customer + "product/single",data)
   }
    
}
