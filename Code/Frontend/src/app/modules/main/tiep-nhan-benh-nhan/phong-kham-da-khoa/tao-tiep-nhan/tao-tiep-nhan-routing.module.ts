
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaoTiepNhanComponent } from './tao-tiep-nhan.component';


const routes: Routes = [
  {
    path: '',
     component: TaoTiepNhanComponent,
     title: 'TIẾP NHẬN > TẠO TIẾP NHẬN - CAMINO CLINIC'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaoTiepNhanRoutingModule { }
