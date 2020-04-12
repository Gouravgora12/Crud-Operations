import { Component, OnInit, OnDestroy } from '@angular/core';
import {AuthService} from '../auth.service'
import {CrudService}  from '../crud.service'
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
  userIsAuthenticated=false
  public isloading=false;
  public value:string;
  public idResult
  private authStatusSub:Subscription
  constructor(private AuthService:AuthService,private crudService:CrudService) { 
    this.authStatusSub=this.AuthService.getauthStatusListner().subscribe(isAuthenticated=>{
      this.userIsAuthenticated=isAuthenticated
    })
  }
  ngOnInit(): void {
  }
  onLogout(){
    this.isloading=true;
    this.AuthService.logout()
  }
  find(){
    this.crudService.getUserDetailById(this.value).subscribe((result)=>{
      this.idResult=result.user
      setTimeout(()=>{
        this.idResult=0
      },10000)
    })
  }
  ngOnDestroy(){
    this.authStatusSub.unsubscribe()
  }
}
