import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HenKhamComponent } from './hen-kham.component';



const routes: Routes = [
  {
    path: '',
     component: HenKhamComponent,
     title: 'BÁO CÁO > HẸN KHÁM - CAMINO CLINIC'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HenKhamRoutingModule { }
