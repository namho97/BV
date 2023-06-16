
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LichSuGuiComponent } from './lich-su-gui.component';


const routes: Routes = [
  {
    path: '',
     component: LichSuGuiComponent,
     title: 'BẢO HIỂM Y TẾ > GỬI HỒ SƠ BHYT > LỊCH SỬ GỬI - CAMINO CLINIC'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LichSuGuiRoutingModule { }
