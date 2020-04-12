import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  mode: any = 'create'
  isloading = false;
  private updataData
  private userId;
  form: FormGroup;
  hide = true;
  constructor(private crudeService: CrudService) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      'fullName': new FormControl(null, { validators: [Validators.required] }),
      'city': new FormControl(null, { validators: [Validators.required] }),
      'phNumber': new FormControl(null, { validators: [Validators.minLength(10), Validators.maxLength(10), Validators.required] }),
      'email': new FormControl(null, { validators: [Validators.email, Validators.required] }),
      'password': new FormControl(null, { validators: [Validators.minLength(6), Validators.required] })
    })
  }
  onAddPerson() {
    if (this.form.invalid) {
      console.log('invalid found');
      return;
    }
    this.isloading = true;
    this.crudeService.createNewPerson(this.form.value.fullName,
      this.form.value.city,
      this.form.value.phNumber,
      this.form.value.email,
      this.form.value.password)
    this.form.reset();
  }


}
