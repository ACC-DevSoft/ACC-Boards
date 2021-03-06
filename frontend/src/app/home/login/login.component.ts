import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginData: any;
  public errorMessage: String;
  constructor(private auth: AuthService, private router: Router) { 
    this.loginData = {};
    this.errorMessage = '';
  }

  ngOnInit(): void {}

  login(){
    if(!this.loginData.email || !this.loginData.password){
      this.errorMessage = "Process Failed: Incomplete Data.";
      this.loginData ={};
      this.closeAlert();
    }else{
      this.auth.login(this.loginData).subscribe(
        (res:any)=>{
          console.log(res);
          localStorage.setItem('token', res.jwtToken);
          this.router.navigate(['/workSpaces']);
        },
        (err)=>{
          console.log(err.error);
          this.errorMessage = err.error;
          this.closeAlert();
        }
      )
    }
   }

  closeAlert(){
    setTimeout(() => {
      this.loginData ={};
      this.errorMessage ='';
    }, 3000);
  }
  close(){
      this.errorMessage ='';
  }
}
