
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';


const routes: Routes = [
  {
    path: '',
     component: LoginComponent,
     title: 'ĐĂNG NHẬP - IOT TRUYỀN THÔNG'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule { }
