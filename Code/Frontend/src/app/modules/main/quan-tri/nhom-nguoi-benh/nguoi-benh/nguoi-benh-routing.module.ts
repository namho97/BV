
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NguoiBenhComponent } from './nguoi-benh.component';


const routes: Routes = [
  {
    path: '',
     component: NguoiBenhComponent,
     title: 'QUẢN TRỊ > NHÓM NGƯỜI BỆNH > NGƯỜI BỆNH - CAMINO CLINIC'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NguoiBenhRoutingModule { }
