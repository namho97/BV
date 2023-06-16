
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LichSuBanThuocComponent } from './lich-su-ban-thuoc.component';


const routes: Routes = [
  {
    path: '',
     component: LichSuBanThuocComponent,
     title: 'NHÀ THUỐC > LỊCH SỬ BÁN THUỐC - CAMINO CLINIC'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LichSuBanThuocRoutingModule { }
