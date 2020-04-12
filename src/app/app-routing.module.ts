import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateUserComponent } from './create-user/create-user.component'
import { UsersListComponent } from './users-list/users-list.component';
import { LoginComponent } from './login/login.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
   { path: '', component: UsersListComponent },
   {path:'edit/:userId',component:EditComponent},
   { path: 'create', component: CreateUserComponent },
   {path:'login',component:LoginComponent},
   { path: '**', component:UsersListComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
