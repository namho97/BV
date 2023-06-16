
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HuongDanSuDungComponent } from './huong-dan-su-dung/huong-dan-su-dung.component';



const routes: Routes = [
  {
    path: '',
     component: HuongDanSuDungComponent,
     title: 'HƯỚNG DẪN SỬ DỤNG - CAMINO CLINIC'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HuongDanSuDungRoutingModule { }
