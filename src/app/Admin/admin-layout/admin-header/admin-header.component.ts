import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';


@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

   isLogin:boolean = false
   constructor(private router:Router,
    private authServiec:AuthService){
   }
   
  ngOnInit(): void {
    this.checkLogin()
  }
  checkLogin(){
    if(this.authServiec.getToken()!=null){
      this.isLogin = true
     
    }
    else{
      this.isLogin = false
    }
  }

  logout(){
    this.authServiec.clearData()
    this.router.navigateByUrl('/login')
  }
}
