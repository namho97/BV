
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LichSuDangKyKhamComponent } from './lich-su-dang-ky-kham.component';

const routes: Routes = [
  {
    path: '',
     component: LichSuDangKyKhamComponent,
     title: 'TIẾP NHẬN > LỊCH SỬ ĐĂNG KÝ KHÁM - CAMINO CLINIC'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LichSuDangKyKhamRoutingModule { }
