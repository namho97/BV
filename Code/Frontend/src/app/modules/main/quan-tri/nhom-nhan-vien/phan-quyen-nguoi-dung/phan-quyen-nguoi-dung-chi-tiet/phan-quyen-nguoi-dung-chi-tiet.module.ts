import { NgScrollbarModule } from 'ngx-scrollbar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhanQuyenNguoiDungChiTietComponent } from './phan-quyen-nguoi-dung-chi-tiet.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    NgScrollbarModule
  ],
  exports:[PhanQuyenNguoiDungChiTietComponent],
  declarations: [PhanQuyenNguoiDungChiTietComponent]
})
export class PhanQuyenNguoiDungChiTietModule { }
