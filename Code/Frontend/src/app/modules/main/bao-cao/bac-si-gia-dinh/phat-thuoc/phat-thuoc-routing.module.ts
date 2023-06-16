
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhatThuocComponent } from './phat-thuoc.component';



const routes: Routes = [
  {
    path: '',
     component: PhatThuocComponent,
     title: 'BÁO CÁO > PHÁT THUỐC - CAMINO CLINIC'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhatThuocRoutingModule { }
