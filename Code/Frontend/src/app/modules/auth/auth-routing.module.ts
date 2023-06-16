import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { AuthComponent } from './auth.component';

const authChildRoutes: Routes = [
  {
    path: 'dang-nhap',
    loadChildren:  () => import('./login/login.module').then(o => o.LoginModule)
  },
  {
    path: 'doi-mat-khau',
    loadChildren:  () => import('./doi-mat-khau/doi-mat-khau.module').then(o => o.DoiMatKhauModule)
  },
  {path: '**', component: PageNotFoundComponent}
];
const authRoutes: Routes = [
    { path: '', component: AuthComponent, data: { title: 'auth Views' }, children: authChildRoutes }
];

@NgModule({
  imports: [
      RouterModule.forChild(authRoutes)
  ],
  exports: [
      RouterModule
  ]
})
export class AuthRoutingModule { }