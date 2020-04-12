import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../environments/environment'
import { Router } from '@angular/router'
import { Subject } from 'rxjs';
import { UserModel } from './app.model';
import { EmailValidator } from '@angular/forms';
const url1 = environment.apiURL1;
const url2=environment.apiURL2;
@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private Users:UserModel[]=[]
  usersCount: number;
  private usersUpdated = new Subject<{ users: UserModel[], usersCount: number }>();
  constructor(private http: HttpClient, private router: Router) { }
  createNewPerson(fullName: string, city: string, phNumber: number, email: string, password: string) {
    const data = {
      fullName: fullName,
      city: city,
      phoneNumber: phNumber,
      email: email,
      password: password
    }
    this.http.post(url1, data).subscribe((responseData) => {
      this.router.navigate(['/'])
    })
  }
  getUsersList(postPerPage: number, currentPage: number) {
    const queryParams = `?pageSize=${postPerPage}&page=${currentPage}`
    this.http.get<{ message: string, People:any, totalPersons: number }>(url1 + queryParams).subscribe((response) => {
      this.Users = response.People
      console.log(response.People)
      this.usersCount = response.totalPersons
        this.usersUpdated.next({ users: [...this.Users], usersCount: this.usersCount });
    })
  }
  getUserDetailById(userId) {
    return this.http.get<{ message: string, user: UserModel }>(url1 + userId)
  }
  getUpdatedListner() {
    return this.usersUpdated.asObservable();
  }
  updateUser(_id: string, fullName: string, city: string, phNumber: number, email: EmailValidator) {
    let upostData =
    {
      fullName: fullName, city: city, phoneNumber: phNumber, email: email
    };
   return this.http.put(url1 + _id, upostData)
  }
  deleteUser(userId) {
    return this.http.delete(url2 + userId)
  }

}
