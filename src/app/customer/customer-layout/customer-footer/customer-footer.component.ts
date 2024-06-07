import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-customer-footer',
  templateUrl: './customer-footer.component.html',
  styleUrls: ['./customer-footer.component.css']
})
export class CustomerFooterComponent {
  constructor(private authservice:AuthService,private router:Router){}
  
 gotocart(){
  if(this.authservice.getToken()!=null){
    this.router.navigateByUrl('/customer-layout/view-card')
  }
  else{
    this.router.navigateByUrl('/login')
  }
 }
  

}
