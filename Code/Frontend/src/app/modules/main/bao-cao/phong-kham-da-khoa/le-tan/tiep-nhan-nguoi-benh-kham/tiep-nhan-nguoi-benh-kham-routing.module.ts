
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TiepNhanNguoiBenhKhamComponent } from './tiep-nhan-nguoi-benh-kham.component';


const routes: Routes = [
  {
    path: '',
     component: TiepNhanNguoiBenhKhamComponent,
     title: 'BÁO CÁO > LỄ TÂN > TIẾP NHẬN KHÁM - CAMINO CLINIC'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TiepNhanNguoiBenhKhamRoutingModule { }
