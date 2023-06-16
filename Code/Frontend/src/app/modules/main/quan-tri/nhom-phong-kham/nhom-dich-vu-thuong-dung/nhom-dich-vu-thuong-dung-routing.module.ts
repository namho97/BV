
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NhomDichVuThuongDungComponent } from './nhom-dich-vu-thuong-dung.component';


const routes: Routes = [
  {
    path: '',
     component: NhomDichVuThuongDungComponent,
     title: 'QUẢN TRỊ > NHÓM PHÒNG KHÁM > NHÓM DỊCH VỤ THƯỜNG DÙNG - CAMINO CLINIC'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NhomDichVuThuongDungRoutingModule { }
