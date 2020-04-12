import { Component, OnInit, OnDestroy } from '@angular/core';
import { CrudService } from '../crud.service';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs'
import { UserModel } from '../app.model'
import { AuthService } from '../auth.service'
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  Users: UserModel[] = [];
  private authStatusSub: Subscription
  isloading = false;
  usersPerPage = 10;
  currentPage = 1;
  totalPeople = 0
  pageSizeOptions = [1, 3, 5, 10];
  tableHeader: string[] = ['fullName', 'city', 'email', 'phoneNumber', '_id']
  public userIsAuthenticated = false
  constructor(private crudService: CrudService, private authService: AuthService) {

    this.authService.getauthStatusListner().subscribe((i) => {
      this.userIsAuthenticated = i
      if (!this.userIsAuthenticated) { this.tableHeader.pop() }
    })
    this.userIsAuthenticated = this.authService.getIsAuth()
  }
  ngOnInit(): void {
    if(!this.userIsAuthenticated){
      this.tableHeader.pop()
    } 
    this.isloading=true;
    this.crudService.getUsersList(this.usersPerPage, this.currentPage)
    this.crudService.getUpdatedListner().subscribe(
      (userData: { users: UserModel[], usersCount: number }) => {
        this.isloading=false;
        this.Users = userData.users;
        this.totalPeople = userData.usersCount
      })
  }
  onChangedPage(pageData: PageEvent) {
    this.isloading=true;
    this.currentPage = pageData.pageIndex + 1;
    this.usersPerPage = pageData.pageSize
    this.crudService.getUsersList(this.usersPerPage, this.currentPage);
  }

  deleteRequest(userId) {
    this.isloading=true
    this.crudService.deleteUser(userId).subscribe(() => {
      this.crudService.getUsersList(this.usersPerPage, this.currentPage)

    })

  }
}