
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LichSuXacNhanComponent } from './lich-su-xac-nhan.component';


const routes: Routes = [
  {
    path: '',
     component: LichSuXacNhanComponent,
     title: 'BẢO HIỂM Y TẾ > XÁC NHẬN BHYT > LỊCH SỬ XÁC NHẬN - CAMINO CLINIC'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LichSuXacNhanRoutingModule { }
