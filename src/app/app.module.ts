import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './auth-interceptor'
import { CreateUserComponent } from './create-user/create-user.component';
//import { AngularModule } from './module/module.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {ReactiveFormsModule,FormsModule} from '@angular/forms';
//import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatInputModule} from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HeaderComponent } from './header/header.component';
import { UsersListComponent } from './users-list/users-list.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ErrorComponent } from './error/error.component';
import { ErrorInterceptor } from './error-interceptor';
import { LoginComponent } from './login/login.component';
import { from } from 'rxjs';
import { EditComponent } from './edit/edit.component';
@NgModule({
  declarations: [
    AppComponent,
    CreateUserComponent,
    HeaderComponent,
    UsersListComponent,
    ErrorComponent,
    LoginComponent,
    EditComponent,
   
  ],
  imports: [
   
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    //AngularModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatIconModule,
    MatFormFieldModule,
    MatTableModule,
    MatDialogModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptor,multi:true}],
  bootstrap: [AppComponent],
  entryComponents:[ErrorComponent]
})
export class AppModule { }
