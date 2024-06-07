import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  setData(obj: any) {
    sessionStorage.setItem('token',obj.token)
    sessionStorage.setItem("userdata",JSON.stringify(obj.data))
  }
  getToken() {
   return sessionStorage.getItem('token')
  }

 


  clearData() {
    sessionStorage.clear()
  }


}
