
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThucHienXacNhanComponent } from './thuc-hien-xac-nhan.component';


const routes: Routes = [
  {
    path: '',
     component: ThucHienXacNhanComponent,
     title: 'BẢO HIỂM Y TẾ > XÁC NHẬN BHYT > THỰC HIỆN XÁC NHẬN - CAMINO CLINIC'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThucHienXacNhanRoutingModule { }
