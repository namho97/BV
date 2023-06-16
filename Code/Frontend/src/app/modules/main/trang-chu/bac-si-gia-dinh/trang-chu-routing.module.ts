
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrangChuComponent } from './trang-chu.component';


const routes: Routes = [
  {
    path: '',
     component: TrangChuComponent,
     title: 'TRANG CHỦ - CAMINO CLINIC'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrangChuRoutingModule { }
