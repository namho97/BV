import { DoanhThuComponent } from './doanh-thu.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  {
    path: '',
     component: DoanhThuComponent,
     title: 'BÁO CÁO > DOANH THU - CAMINO CLINIC'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoanhThuRoutingModule { }
