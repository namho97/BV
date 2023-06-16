
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThucHienGuiComponent } from './thuc-hien-gui.component';


const routes: Routes = [
  {
    path: '',
     component: ThucHienGuiComponent,
     title: 'BẢO HIỂM Y TẾ > GỬI HỒ SƠ BHYT > THỰC HIỆN GỬI - CAMINO CLINIC'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThucHienGuiRoutingModule { }
