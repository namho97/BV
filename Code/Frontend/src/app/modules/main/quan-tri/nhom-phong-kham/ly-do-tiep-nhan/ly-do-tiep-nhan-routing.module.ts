
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LyDoTiepNhanComponent } from './ly-do-tiep-nhan.component';


const routes: Routes = [
  {
    path: '',
     component: LyDoTiepNhanComponent,
     title: 'QUẢN TRỊ > NHÓM PHÒNG KHÁM > LÝ DO TIẾP NHẬN - CAMINO CLINIC'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LyDoTiepNhanRoutingModule { }
