
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LichSuThuThuatComponent } from './lich-su-thu-thuat.component';


const routes: Routes = [
  {
    path: '',
     component: LichSuThuThuatComponent,
     title: 'THỦ THUẬT > LỊCH SỬ THỦ THUẬT - CAMINO CLINIC'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LichSuThuThuatRoutingModule { }
