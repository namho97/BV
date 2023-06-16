
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LichSuThuVienPhiComponent } from './lich-su-thu-vien-phi.component';


const routes: Routes = [
  {
    path: '',
     component: LichSuThuVienPhiComponent,
     title: 'THU NGÂN > LỊCH SỬ THU VIỆN PHÍ - CAMINO CLINIC'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LichSuThuVienPhiRoutingModule { }
