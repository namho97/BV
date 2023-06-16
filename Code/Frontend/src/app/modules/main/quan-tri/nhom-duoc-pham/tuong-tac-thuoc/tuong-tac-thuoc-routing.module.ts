
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TuongTacThuocComponent } from './tuong-tac-thuoc.component';


const routes: Routes = [
  {
    path: '',
     component: TuongTacThuocComponent,
     title: 'QUẢN TRỊ > NHÓM DƯỢC PHẨM > TƯƠNG TÁC THUỐC - CAMINO CLINIC'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TuongTacThuocRoutingModule { }
