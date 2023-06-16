
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DangKyKhamComponent } from './dang-ky-kham.component';

const routes: Routes = [
  {
    path: '',
     component: DangKyKhamComponent,
     title: 'TIẾP NHẬN > ĐĂNG KÝ KHÁM - CAMINO CLINIC'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DangKyKhamRoutingModule { }
