
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThucHienThuThuatComponent } from './thuc-hien-thu-thuat.component';


const routes: Routes = [
  {
    path: '',
     component: ThucHienThuThuatComponent,
     title: 'THỦ THUẬT > THỰC HIỆN THỦ THUẬT - CAMINO CLINIC'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThucHienThuThuatRoutingModule { }
