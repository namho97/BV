
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LichSuTiepNhanComponent } from './lich-su-tiep-nhan.component';


const routes: Routes = [
  {
    path: '',
     component: LichSuTiepNhanComponent,
     title: 'TIẾP NHẬN > LỊCH SỬ TIẾP NHẬN - CAMINO CLINIC'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LichSuTiepNhanRoutingModule { }
