
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CapCodeComponent } from './cap-code.component';


const routes: Routes = [
  {
    path: '',
     component: CapCodeComponent,
     title: 'XÉT NGHIỆM > CẤP CODE - CAMINO CLINIC'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CapCodeRoutingModule { }
