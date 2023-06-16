import { LichHenComponent } from './lich-hen.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
     component: LichHenComponent,
     title: 'TIẾP NHẬN > LỊCH HẸN - CAMINO CLINIC'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LichHenRoutingModule { }
