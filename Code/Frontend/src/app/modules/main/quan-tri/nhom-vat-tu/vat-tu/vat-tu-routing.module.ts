
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VatTuComponent } from './vat-tu.component';


const routes: Routes = [
  {
    path: '',
     component: VatTuComponent,
     title: 'QUẢN TRỊ > NHÓM VẬT TƯ > VẬT TƯ - CAMINO CLINIC'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VatTuRoutingModule { }
