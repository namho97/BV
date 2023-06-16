
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KhamBenhComponent } from './kham-benh.component';


const routes: Routes = [
  {
    path: '',
     component: KhamBenhComponent,
     title: 'BÁO CÁO > BÁC SĨ > KHÁM BỆNH - CAMINO CLINIC'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KhamBenhRoutingModule { }
