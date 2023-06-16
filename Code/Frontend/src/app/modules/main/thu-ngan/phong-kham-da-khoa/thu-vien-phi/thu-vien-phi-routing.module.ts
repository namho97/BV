
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThuVienPhiComponent } from './thu-vien-phi.component';


const routes: Routes = [
  {
    path: '',
     component: ThuVienPhiComponent,
     title: 'THU NGÂN > THU VIỆN PHÍ - CAMINO CLINIC'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThuVienPhiRoutingModule { }
