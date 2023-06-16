
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LichSuKhamComponent } from './lich-su-kham.component';


const routes: Routes = [
  {
    path: '',
     component: LichSuKhamComponent,
     title: 'KHÁM BỆNH > LỊCH SỬ KHÁM - CAMINO CLINIC'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LichSuKhamRoutingModule { }
