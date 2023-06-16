import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DoiMatKhauComponent } from './doi-mat-khau.component';

const routes: Routes = [
  {
    path: '',
     component: DoiMatKhauComponent,
     title: 'ĐỔI MẬT KHẨU - IOT TRUYỀN THÔNG'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoiMatKhauRoutingModule { }

