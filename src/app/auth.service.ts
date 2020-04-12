import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../environments/environment'
import { Router } from '@angular/router'
import { Subject } from 'rxjs';
const url = environment.apiURL1;
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string
  private userId: string
  private tokentimer:any
  private isAuthenticated=false;
  private authStatusListner=new Subject<boolean>();
  constructor(private http: HttpClient, private router: Router) { }
  gettoken() {
    return this.token;
  }
  getIsAuth(){
    return this.isAuthenticated;
  }
  getauthStatusListner(){
    return this.authStatusListner.asObservable();
}
  loginUser(email: string, password: string) {
    const data = { email: email, password: password }
    this.http.post<{ token: string, expiresIn: number, userId: string }>(url + 'login', data).subscribe(response => {
      this.token=response.token
      if (this.token) {
        const expiresInDuration = response.expiresIn;
        this.setAuthTimer(expiresInDuration)
        this.userId = response.userId
        const date = new Date()
        const expirationDate = new Date(date.getTime() + expiresInDuration * 1000)
        this.saveAuthData(this.token, expirationDate, this.userId);
        this.isAuthenticated=true
        this.authStatusListner.next(true)
      }
        this.router.navigate(['/'])
      },error=>{
        this.isAuthenticated=false
        this.authStatusListner.next(false)
      })
    }
       
     autoAuthUser() {
    const authInfo = this.getAuthData()
    if (!authInfo) 
    {
      this.authStatusListner.next(false)
      this.isAuthenticated=false
      return;

    }
    const now = new Date()
    const expireIn = authInfo.expirationDate.getTime() - now.getTime()
    this.userId = authInfo.userId
    if (expireIn > 0) {
      this.authStatusListner.next(true)
      this.isAuthenticated=true
      this.token = authInfo.token;
      this.setAuthTimer(expireIn / 1000);
    }
  }
  setAuthTimer(duration: number) {
    this.tokentimer = setTimeout(() => { this.logout() }, duration * 1000)
  }
  logout() {
    this.token = null;
    this.isAuthenticated=false
    this.authStatusListner.next(false)
    this.userId = null;
    clearTimeout(this.tokentimer)
    this.clearAuthData()
    this.router.navigate(['/'])
  }
  saveAuthData(token: string, expirationDate: any, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate)
    localStorage.setItem('userId', userId)
  }
  clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration")
    localStorage.removeItem('userId')
  }
  getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration")
    const userId = localStorage.getItem('userId');
    if (!token || !expirationDate) {
      return
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
    }
  }
}