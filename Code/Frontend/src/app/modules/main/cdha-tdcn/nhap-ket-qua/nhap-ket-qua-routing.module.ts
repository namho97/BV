
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NhapKetQuaComponent } from './nhap-ket-qua.component';


const routes: Routes = [
  {
    path: '',
     component: NhapKetQuaComponent,
     title: 'CĐHA-TDCN - NHẬP KẾT QUẢ - CAMINO CLINIC'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NhapKetQuaRoutingModule { }
