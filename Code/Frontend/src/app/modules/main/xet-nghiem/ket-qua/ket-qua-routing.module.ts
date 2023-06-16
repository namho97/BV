
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KetQuaComponent } from './ket-qua.component';


const routes: Routes = [
  {
    path: '',
     component: KetQuaComponent,
     title: 'XÉT NGHIỆM > KẾT QUẢ - CAMINO CLINIC'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KetQuaRoutingModule { }
