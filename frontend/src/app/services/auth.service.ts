import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private env : String;
  public Admin : Boolean;
  public userData : Object;

  constructor(private http: HttpClient, private router: Router) { 
    this.env = environment.APP_URL;
    this.Admin = false;
    this.userData = {};
  }

  registerUser(user: any) {
    return this.http.post(this.env + 'user/registerUser/', user)
  }
  login(user: any){
    return this.http.post(this.env + "auth/login?include=", user);
  }
  isAdmin(){
    this.Admin = true;
  }

  forAdmin(){
    this.Admin === true;
    return this.Admin;
  }

  getUserData() {
    return this.userData
  }

  setUserData(data:any) {
    this.userData = data;
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }
  
  getCurrent(){
    let currentUser = localStorage.getItem('current');
    return currentUser;
  }

  getToken(){
    return localStorage.getItem('token');
  }

  logOut(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
