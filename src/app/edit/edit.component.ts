import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CrudService } from '../crud.service';
import { Router } from '@angular/router'
import { error } from '@angular/compiler/src/util';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  mode: any = 'create'
  isloading=false;
  private updataData;
  private userId;
  form: FormGroup;
  constructor(private crudeService: CrudService, private maproute: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'fullName': new FormControl(null),
      'city': new FormControl(null),
      'phNumber': new FormControl(null),
      'email': new FormControl(null),
    })
    this.maproute.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('userId')) {
        this.mode = 'edit';
        this.userId = paramMap.get('userId');
        this.crudeService.getUserDetailById(this.userId).subscribe(response => {
          this.updataData = {
            '_id': response.user._id,
            'fullName': response.user.fullName,
            'city': response.user.city,
            'phNumber': response.user.phoneNumber,
            'email': response.user.email
          }
          this.form.setValue({
            'fullName': this.updataData.fullName,
            'city': this.updataData.city,
            'phNumber': this.updataData.phNumber,
            'email': this.updataData.email,
          })
        })
      }
    })
  }
  onEditUser() {
    if (this.mode == 'edit') {
      this.isloading=true
      this.crudeService.updateUser(
        this.userId,
        this.form.value.fullName,
        this.form.value.city,
        this.form.value.phNumber,
        this.form.value.email
      ).subscribe(()=>{
        this.router.navigate(['/'])
        
      },error=>{
        this.isloading=false
      })
      
    }
  }
}
