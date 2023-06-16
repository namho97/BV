
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IcdComponent } from './icd.component';


const routes: Routes = [
  {
    path: '',
     component: IcdComponent,
     title: 'QUẢN TRỊ > NHÓM PHÒNG KHÁM > ICD - CAMINO CLINIC'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IcdRoutingModule { }
