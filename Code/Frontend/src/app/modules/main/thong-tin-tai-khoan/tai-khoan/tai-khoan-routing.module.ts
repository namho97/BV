
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaiKhoanComponent } from './tai-khoan.component';


const routes: Routes = [
  {
    path: '',
     component: TaiKhoanComponent,
    data: {
      title: 'Tài khoản'
    },    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaiKhoanRoutingModule { }
