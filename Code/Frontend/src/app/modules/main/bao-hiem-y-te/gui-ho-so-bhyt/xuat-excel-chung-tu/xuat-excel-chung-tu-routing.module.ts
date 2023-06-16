
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { XuatExcelChungTuComponent } from './xuat-excel-chung-tu.component';


const routes: Routes = [
  {
    path: '',
     component: XuatExcelChungTuComponent,
     title: 'BẢO HIỂM Y TẾ > GỬI HỒ SƠ BHYT > XUẤT EXCEL CHỨNG TỪ - CAMINO CLINIC'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class XuatExcelChungTuRoutingModule { }
