
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BacSiKhamComponent } from './bac-si-kham.component';


const routes: Routes = [
  {
    path: '',
     component: BacSiKhamComponent,
     title: 'KHÁM BỆNH > BÁC SĨ KHÁM - CAMINO CLINIC'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BacSiKhamRoutingModule { }
