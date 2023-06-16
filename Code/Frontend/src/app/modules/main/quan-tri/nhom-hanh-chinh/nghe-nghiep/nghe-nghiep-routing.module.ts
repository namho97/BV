
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NgheNghiepComponent } from './nghe-nghiep.component';


const routes: Routes = [
  {
    path: '',
     component: NgheNghiepComponent,
     title: 'QUẢN TRỊ > NHÓM HÀNH CHÍNH > NGHỀ NGHIỆP - CAMINO CLINIC'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NgheNghiepRoutingModule { }
