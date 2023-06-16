
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LichSuCdhaTdcnComponent } from './lich-su-cdha-tdcn.component';


const routes: Routes = [
  {
    path: '',
     component: LichSuCdhaTdcnComponent,
     title: 'CĐHA-TDCN > LỊCH SỬ - CAMINO CLINIC'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LichSuCdhaTdcnRoutingModule { }
